"use strict";
module.exports = (sequelize, DataTypes) => {
    const Ordaddr = sequelize.define(
        "Ordaddr",
        {
            oid: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            addrid: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
        },
        {
            paranoid: false,
            timestamps: false,
            "freezeTableName": true,
            "tableName": 'address',
        });
    return Ordaddr;
};
