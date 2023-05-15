"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "category",
    {
      catid: {
        type: DataTypes.DOUBLE,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: true,
      },
      catdesc: DataTypes.STRING,
      catmid: DataTypes.INTEGER,
    },
    {
      paranoid: true,
      "freezeTableName": true,
      "tableName": 'category',
    }
  );
  return Category;
};
