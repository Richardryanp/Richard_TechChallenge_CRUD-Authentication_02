const { PrismaClient } = require("@prisma/client");
// import PrismaClient dari packagenya

const prisma = new PrismaClient();
//buat instance prisma

module.exports = prisma;
