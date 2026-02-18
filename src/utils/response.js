exports.successResponse = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({ 
    message, // pesan ke client
    data, // data tambahan
  });
};

exports.errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    message, // cuman kirim pesen error
  });
};
