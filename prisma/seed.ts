import { PrismaClient, TreeTier, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.siteConfig.createMany({
    data: [
      { key: "prebooking_open", value: "true" },
      { key: "total_trees_available", value: "150" },
      { key: "trees_rented", value: "87" },
    ],
    skipDuplicates: true,
  });

  await prisma.user.upsert({
    where: { email: "admin@apnatree.in" },
    create: {
      email: "admin@apnatree.in",
      name: "ApnaTree Admin",
      role: UserRole.ADMIN,
      country: "IN",
    },
    update: {
      role: UserRole.ADMIN,
    },
  });

  const tierCycle = [TreeTier.SMALL, TreeTier.MEDIUM, TreeTier.LARGE];
  for (let i = 1; i <= 50; i++) {
    const tier = tierCycle[(i - 1) % 3];
    const ageYears = tier === TreeTier.SMALL ? 3 : tier === TreeTier.MEDIUM ? 5 : 8;
    const treeCode = `GIR-K-${String(i).padStart(4, "0")}`;
    await prisma.tree.upsert({
      where: { treeCode },
      create: {
        treeCode,
        tier,
        ageYears,
        isAvailable: true,
      },
      update: {
        tier,
        ageYears,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
