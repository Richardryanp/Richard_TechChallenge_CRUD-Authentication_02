const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Hashing password
  const hashedPassword = await bcrypt.hash("password123", 10); // default password semua user 1 - 20 is password123

  // Create admin
  const admin = await prisma.user.upsert({ // upsert itu buat create baru kalo gaada, kalo udah ada ga update apa2
    where: { email: "admin@gmail.com" },  // kalo gaada create baru
    update: {}, // kalo udah ada, ga update apa2
    create: {
      name: "Admin User",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin", 
    },
  });

  // Create user 1
  const user1 = await prisma.user.upsert({
    where: { email: "user1@gmail.com" },
    update: {},
    create: {
      name: "User One",
      email: "user1@gmail.com",
      password: hashedPassword,
      role: "user", // bukan admin
    },
  });

  // Create user 2
  const user2 = await prisma.user.upsert({
    where: { email: "user2@gmail.com" },
    update: {},
    create: {
      name: "User Two",
      email: "user2@gmail.com",
      password: hashedPassword,
      role: "user",
    },
  });

  const users = [admin, user1, user2];
  // masukin semua user ke dalem array, nanti buat random author pas bikin post
  // Create 20 posts, random user as author

  // Delete existing posts first (avoid duplication), biar kalo dibuat ulang ga jadi 40 60 dst
  await prisma.post.deleteMany();

  // Create 20 posts
  for (let i = 1; i <= 20; i++) { // loop dari 1 sampe 20, buat bikin 20 post
    const randomUser = users[i % users.length]; // bagi rata post ke 3 user, post 1 buat admin, post 2 buat user1, post 3 buat user2, post 4 balik lagi buat admin dst

    await prisma.post.create({
      data: {
        title: `Sample Post ${i}`, //judul sesuai nomor post, biar gampang bedain
        content: `This is the content of sample post number ${i}.`, // sama dengan judul
        published: true,
        userId: randomUser.id,
      },
    });
  }

  console.log("Seeding finished.");
}

main() // jalanin fungsi main()
  .catch((e) => { // kalau ada error
    console.error(e); // print errornya
    process.exit(1); // stop program dengan kode 1
  })
  .finally(async () => {
    await prisma.$disconnect(); // disconnect prisma
  });
