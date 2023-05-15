"use strict";
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "client",
    {
      cid: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        // defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: true,
      },
      cname: DataTypes.STRING,
      cmid: DataTypes.STRING,
      clast: DataTypes.STRING,
      cphone: DataTypes.STRING,
    },
    {
      paranoid: true,
      "freezeTableName": true,
      "tableName": 'client',
    }
  );
  return Client;
};
