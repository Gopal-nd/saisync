// scripts/cleanupWrittenType.ts

import { prisma } from "@repo/db";


async function main() {
  console.log(' Fixing old "MSQ" values...');

  const result = await prisma.$executeRawUnsafe(`
    UPDATE "Subject"
    SET "writtenType" = 'MCQ'
    WHERE "writtenType" = 'MSQ'
  `);

  console.log(` Updated ${result} records.`);
}

main()
  .then(() => {
    console.log(' Cleanup completed.');
    return prisma.$disconnect();
  })
  .catch((err) => {
    console.error('Cleanup failed:', err);
    return prisma.$disconnect();
  });
