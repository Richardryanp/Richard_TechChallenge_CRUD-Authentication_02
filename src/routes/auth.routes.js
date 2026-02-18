const express = require("express"); 
const router = express.Router(); 
const authController = require("../controllers/auth.controller");
// import controller buat auth, route itu ga berisi logika sistemnya
// tapi cuman buat mengarahkan ke controller

const { authAny } = require("../middleware/auth.middleware");
// ini sangat penting, middleware ini untuk ngecek validasi token JWT.
// jadi middlewarenya akan dijalankan sebelum controller

router.post("/register", authController.register);
router.post("/login", authController.login);
// bila ada request ke /register, masukin ke authController.register.
// bila ada request ke /login, masukin ke authController.login.
// Dua duanya belum pake middleware, karena register dan login belum butuh token JWT

router.get("/profile", authAny, authController.profile);
// authAny itu middleware buat ngecek token JWT, 
// jadi kalo gaada token atau tokennya salah, requestnya gabakal lanjut ke authController.profile

module.exports = router;
// diexport biar bisa dipake sama file lain, app.js