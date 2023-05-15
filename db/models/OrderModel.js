"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      oid: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      username: DataTypes.STRING,
      ostatus: DataTypes.STRING,
      addrid: {
        type: DataTypes.BIGINT,
        primaryKey: false,
        autoIncrement: false,
        allowNull: true,
    },
    },
    {
      paranoid: false,
      timestamps: false,
      "freezeTableName": true,
      "tableName": 'orders',
    });
  return Order;
};
