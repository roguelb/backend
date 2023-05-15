require("dotenv").config();
module.exports = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dialect: "mysql",
};

// require("dotenv").config();
// module.exports = {
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "smartmart",
//   port: 3306,
//   dialect: "mysql",
// };
