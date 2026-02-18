const { errorResponse } = require("../utils/response");
// helper buat response error, biar format responsnya konsisten dan ga repetisi

const errorHandler = (err, req, res, next) => { // express bisa tau ini error middleware soalnya ada 4 parameter dan param pertama err
  console.error(err); // buat debugging

  return errorResponse(
    res,
    err.statusCode || 500, //kalo errornya ada statusCode pake itu, kalo ga default 500
    err.message || "Internal Server Error" //kalo errornya ada message pake itu, kalo ga default "Internal Server Error"
  );
};

module.exports = errorHandler;
