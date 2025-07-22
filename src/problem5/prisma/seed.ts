import prisma from "../src/db/prisma.client";
import { fa, faker } from "@faker-js/faker";

async function main() {
  await prisma.task.createMany({
    // Seeding 100 tasks for testing purposes
    data: Array.from({ length: 100 }, (_, i) => ({
      title: faker.lorem.sentence(1),
      description: faker.lorem.paragraph(2),
      completed: faker.datatype.boolean({ probability: 0.5 }),
    })),
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
