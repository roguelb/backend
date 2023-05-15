"use strict";
module.exports = (sequelize, DataTypes) => {
  const ClientUser = sequelize.define(
    "clientuser",
    {
      cid: {
        type: DataTypes.BIGINT,
      },
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      password: DataTypes.STRING,
    },
    {
      paranoid: true,
      "tableName": 'clientuser',
    }
  );
  return ClientUser;
};
