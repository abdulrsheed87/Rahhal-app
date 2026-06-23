import { seedDatabase } from "../src/lib/seed";

seedDatabase()
  .then(() => {
    console.log("Database seeded successfully");
    process.exit(0);
  })
  .catch((e: unknown) => {
    console.error(e);
    process.exit(1);
  });
