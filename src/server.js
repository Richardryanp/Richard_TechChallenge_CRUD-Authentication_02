require("dotenv").config();
// Load environment variables dari .env file

const app = require("./app");
// Import app dari app.js yang sudah disetup sama semua middleware dan routesnya

const PORT = process.env.PORT || 3000;
// Ambil PORT dari environment variable, atau default ke 3000 kalo gaada

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Mulai server dan listen ke PORT yang udah ditentuin