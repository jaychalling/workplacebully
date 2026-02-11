import { PrismaClient } from "@prisma/client";
import { sampleCases } from "../../src/lib/data/cases";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.caseRecord.deleteMany();
  console.log("Cleared existing case records");

  for (const c of sampleCases) {
    await prisma.caseRecord.create({
      data: {
        title: c.title,
        court: c.court,
        date: c.date,
        result: c.result,
        summary: c.summary,
        keywords: c.keywords,
        fullText: c.fullText,
      },
    });
  }

  console.log(`Seeded ${sampleCases.length} case records`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
