const express = require("express");
const cors = require("cors");
// express framework utama buat server, cors biar API bisa diakses dari domain lain (frontend)

const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
//import routes buat auth (register, login) dan post (CRUD). nama variabelnya sesuai sama nama file biar gampang diinget

const errorHandler = require("./middleware/error.middleware");
// middleware global buat handle error

const app = express();
// inisialisasi express app

app.use(cors());
app.use(express.json());
// cors biar bisa diakses dri domain lain
// express.json() biar body JSON bisa dibaca

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
// kalau ada request ke /api/auth, masukin ke authRoutes
// kalau ada request ke /api/posts, masukin ke postRoutes

app.use(errorHandler);
// middleware buat handle error, ditaroh di paling bawah setelah semua route, best practice seperti itu

module.exports = app;
// export app biar bisa dipake sama file lain, contohnya server.js