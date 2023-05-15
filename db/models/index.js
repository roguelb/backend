const dbConfig = require("../config/DBConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("connectedzzz..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./UserModel.js")(sequelize, DataTypes);
db.products = require("./ProductModel")(sequelize, DataTypes);
db.clients = require("./ClientModel")(sequelize, DataTypes);
db.clientuser = require("./ClientUserModel")(sequelize, DataTypes);
db.order = require("./OrderModel")(sequelize, DataTypes);
db.orderline = require("./OrderLineModel")(sequelize, DataTypes);
db.address = require("./AddressModel")(sequelize, DataTypes);
db.ordaddr = require("./OrdaddrModel")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});
module.exports = db;
