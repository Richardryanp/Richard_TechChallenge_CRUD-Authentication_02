const prisma = require("../lib/prisma"); // konek database via prisma
const bcrypt = require("bcrypt"); // buat hash password
const jwt = require("jsonwebtoken"); // generate sama verify token JWT

exports.register = async ({ name, email, password }) => {
  if (!name || !email || !password) { //cek ada field kosong ga, kalo ada throw error
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }, //cek database, cari user berdasarkan email
  });

  if (existingUser) { // kalo email udah ada, throw error
    const error = new Error("Email already registered");
    error.statusCode = 400;
    throw error; 
  }

  const hashedPassword = await bcrypt.hash(password, 10); 
  // hash password pake bcrypt, biar aman ga plain text

  const user = await prisma.user.create({ // simpen data user baru ke database
    data: {
      name,
      email,
      password: hashedPassword, // yg disimpen bukan password asli, tpi hashnya
    },
  }); 

  return user;
};

exports.login = async ({ email, password }) => {
  if (!email || !password) { // cek ada field kosong ga, kalo ada throw error
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const user = await prisma.user.findUnique({
    where: { email }, // cari user di database berdasarkan email
  });

  if (!user) { // kalo gaada, throw error invalid credentials
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password); 
  // bandingin password yg diinput sama hash password yg di database

  if (!isMatch) { // kalo ga sama, throw eror, error message sama(good security)
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  ); // token ada 3 parameter, 1. payload(datanya), 2. secret key di env, 3. opsi expired

  return { token, user };
};
