import { PrismaClient } from "../generated/prisma";

const db = new PrismaClient();

async function seedData() {
  await db.user.deleteMany();

  await db.user.createMany({
    data: [
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
      { name: "Charlie", email: "charlie@example.com" },
    ],
  });

  console.log("✅ Seeded users");
}

seedData()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
