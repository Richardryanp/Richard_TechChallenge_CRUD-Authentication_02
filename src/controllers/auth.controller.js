const authService = require("../services/auth.service");
// import service buat auth
const { successResponse } = require("../utils/response");
// import helper buat response sukses, biar format responsnya konsisten dan ga repetisi

exports.register = async (req, res, next) => { // export function bernama register
  try {
    const user = await authService.register(req.body); 
    // data dari body dikirim ke authService.register
    // validasi dkk akan dilakukan di authService terus bakal dimasukin ke dalem database.
    // kalau berhasil, user yang baru dibuat bakal di return, kalp gagal throw error
  
    return successResponse(res, 201, "User registered successfully", {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    // kalo berhasil, return respons sukses dan data = id,name,email,role 

  } catch (error) {
    next(error); // kalau ada error, lempar ke middleware error handler
  }
};

exports.login = async (req, res, next) => { // export function bernama login
  try {
    const { token, user } = await authService.login(req.body);
    // data dari body dikirim ke authService.login
    // di authService.login, email dan password akan divalidasi
    // kalau valid token JWT dibuat dan usernya di return, kalau ga valid throw error

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  // kalau berhasil, return respons sukses, token JWT dan user = id,name,email,role

  } catch (error) {
    next(error);
  }
}; //catch error dan lempar ke middleware error handler

exports.profile = async (req, res, next) => { // export function bernama profile
  try {
    return successResponse(res, 200, "User profile", req.user);
    // req.user itu data user yang udah di decode dari token JWT di middleware authAny
    // Kenapa bisa ada authAny? Karena di route, kalo mau masuk ke authController.profile, harus lewat middleware authAny dulu.
    // Data itu disimpen di dalem JWTnya, Header_Payload_Signature, kalo tokennya valid, data itu di decode pake jwt.verify trus disimpen di req.user
    
  } catch (error) {
    next(error); // kalau ada error, lempar ke middleware error handler
  }
};
