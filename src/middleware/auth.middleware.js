const jwt = require("jsonwebtoken"); // buat verify token JWT
const { errorResponse } = require("../utils/response"); // helper buat response error, biar format responsnya konsisten dan ga repetisi

exports.authAny = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // ambil header authorization dari request

    if (!authHeader || !authHeader.startsWith("Bearer ")) { // cek format header, harus start with Bearer. kalo ga sesuai, return error
      return errorResponse(res, 401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1]; // ambil tokennya, kalau headernya Bearer aa.bb.cc, jadi ["Bearer", "aa.bb.cc"], ambil index 1

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //jwt.verify buat ngecek tokennya valid atau ga(signature cocok atau ga, expired?)

    req.user = decoded; // simpen ke dalem req.user, biar bisa diakses controller

    next(); // klo sampe sini artinya token valid, lanjut ke controller
  } catch (error) {
    return errorResponse(res, 401, "Invalid or expired token"); // kalo tokennya ga valid atau expired, return error
  }
};

exports.authAdmin = (req, res, next) => { 
  try {
    if (!req.user || req.user.role !== "admin") { //cek role user, admin atau ga
      return errorResponse(res, 403, "Forbidden: Admin only"); // kalo ga admin, return error forbidden
    }

    next(); // klo sampe sini artinya user admin, lanjut ke controller
    
  } catch (error) {
    return errorResponse(res, 403, "Forbidden");
  }
};
