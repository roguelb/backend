"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      password: DataTypes.STRING,
      level: DataTypes.STRING,
    },
    {
      paranoid: false,
      timestamps: false,
      "freezeTableName": true,
      "tableName": 'user',
    }
  );
  return User;
};
