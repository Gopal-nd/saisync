import { PrismaClient, BranchType, SemesterType, SectionType } from '@prisma/client';
import { prisma } from '../src/lib/db';



async function main() {
  // Create branches
  const branches = await Promise.all(
    Object.values(BranchType).map(async (branch) => {
      return await prisma.branch.upsert({
        where: {
          branchName: branch,
        },
        update: {},
        create: {
          branchName: branch,
        },
      });
    })
  )
  console.log('✅ Branches created:', branches.map((b) => b.branchName));

  // Create semesters and sections
  for (const branch of branches) {
    for (const sem of Object.values(SemesterType)) {
      const semester = await prisma.semester.upsert({
        where: {
          branchName_semesterName: {
            branchName: branch.branchName,
            semesterName: sem,
          },
        },
        update: {},
        create: {
          branchName: branch.branchName,
          semesterName: sem,
        },
      });

      console.log(`📘 Semester ${sem} created for ${branch.branchName}`);

      // Create sections for each semester
      await Promise.all(
        Object.values(SectionType).map(async (section) => {
          await prisma.section.upsert({
            where: {
              branchName_semesterName_sectionName: {
                branchName: branch.branchName,
                semesterName: sem,
                sectionName:section,
              },
            },
            update: {},
            create: {
              branchName: branch.branchName,
              semesterName: sem,
              sectionName:section
            },
          });
        })
      );

      console.log(` Sections created for ${branch.branchName} - Semester ${sem}`);
    }
  }

  console.log('✅ All data seeded!');
}

main()
  .catch((e) => {
    console.error(' Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
