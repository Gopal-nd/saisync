import { PrismaClient, BranchType, SemesterType } from '@prisma/client';
import { prisma } from '../src/lib/db';



async function main() {
  // Create branches
  const branches = await Promise.all(
    Object.values(BranchType).map(async (branch) => {
      return prisma.branch.upsert({
        where: { name: branch },
        update: {},
        create: { name: branch },
      });
    })
  );

  console.log('Branches created:', branches);

  // Create semesters for each branch using branchName instead of branchId
  await Promise.all(
    branches.map(async (branch) => {
      const semesters = Object.values(SemesterType).map((sem) => ({
        branchName: branch.name,
        number: sem,
      }));

      await Promise.all(
        semesters.map(async (semester) => {
          await prisma.semester.upsert({
            where: {
              branchName_number: {
                branchName: semester.branchName,
                number: semester.number,
              },
            },
            update: {},
            create: semester,
          });
        })
      );
    })
  );

  console.log('Semesters created for all branches');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
