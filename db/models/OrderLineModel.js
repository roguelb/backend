"use strict";
module.exports = (sequelize, DataTypes) => {
  const OrderLine = sequelize.define(
    "orderline",
    {
      oid: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      pid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      olqtty: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      olprice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      paranoid: false,
      timestamps: false,
      "freezeTableName": true,
      "tableName": 'orderline',
    }
  );
  return OrderLine;
};
