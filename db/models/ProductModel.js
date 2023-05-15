"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "product",
    {
      pid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      pdesc: DataTypes.STRING,
      catid: DataTypes.DOUBLE,
      pprice: DataTypes.DOUBLE,
      imageurl: DataTypes.STRING,
      pshow: DataTypes.STRING,
    },
    {
      paranoid: true,
      "freezeTableName": true,
      "tableName": 'product',
    }
  );
  return Product;
};
