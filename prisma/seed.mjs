import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const tableNames = {
  user: "User",
  post: "Post",
  dog: "Dog",
};
const prisma = new PrismaClient();

async function resetTables() {
  const promises = Object.values(tableNames).map(
    (name) =>
      // https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executerawunsafe
      prisma.$queryRawUnsafe(`Truncate "${name}" restart identity cascade;`)
    // https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#considerations
    // prisma.$queryRaw`Truncate ${name} restart identity cascade`
  );
  const result = await Promise.all(promises);
  console.log("reset tables", result);
}

function createUser() {
  return {
    name: faker.person.fullName(),
    posts: {
      create: {
        title: faker.word.words(),
      },
    },
  };
}

function createDog() {
  return {
    name: faker.internet.displayName(),
    imageUrl: faker.image.urlLoremFlickr({
      category: "dog",
      width: 640,
      height: 480,
    }),
    breed: faker.animal.dog(),
  };
}

async function seedData({ count, tableName, createHelper, logName }) {
  // https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-multiple-records-and-multiple-related-records
  const promises = Array.from({ length: count }).map(() =>
    prisma[tableName].create({
      data: createHelper(),
    })
  );
  const result = await Promise.all(promises);
  console.log(logName, result);
}

async function main() {
  // ... you will write your Prisma Client queries here
  await resetTables();

  await seedData({
    count: 5,
    tableName: tableNames.user,
    createHelper: createUser,
    log: "Seed Users and Posts",
  });

  await seedData({
    count: 2,
    tableName: tableNames.dog,
    createHelper: createDog,
    logName: "Seed Dog",
  });

  console.log("End seeding..");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(() => {
    console.log("Disconnected..");
  });
