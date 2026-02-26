// prisma/seed.ts
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/db"; // adjust path if needed
import { BranchType, SemesterType, SectionType } from "@prisma/client";

async function main() {
  // 1) Create / upsert branches
  const branches = await Promise.all(
    Object.values(BranchType).map(async (branch) =>
      prisma.branch.upsert({
        where: { branchName: branch },
        update: {},
        create: { branchName: branch },
      })
    )
  );

  console.log("✅ Branches upserted:", branches.map((b) => b.branchName));

  // 2) Ensure admin user (idempotent)
  const hashedPassword = await bcrypt.hash("123123", 10);

  const adminEmail = "admin@admin.com";
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      // decide what you want to update on existing user; here we update password and name/role
      password: hashedPassword,
      name: "admin",
      role: "ADMIN",
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: "admin",
      role: "ADMIN",
    },
  });

  console.log("✅ Admin user upserted:", admin.email);

  // 3) Create semesters and sections (idempotent via upsert)
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

      console.log(`📘 Semester ${sem} upserted for ${branch.branchName}`);

      // create sections for this semester
      await Promise.all(
        Object.values(SectionType).map(async (section) =>
          prisma.section.upsert({
            where: {
              branchName_semesterName_sectionName: {
                branchName: branch.branchName,
                semesterName: sem,
                sectionName: section,
              },
            },
            update: {},
            create: {
              branchName: branch.branchName,
              semesterName: sem,
              sectionName: section,
            },
          })
        )
      );

      console.log(`   Sections upserted for ${branch.branchName} - Semester ${sem}`);
    }
  }

  console.log("✅ All data seeded/upserted!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

