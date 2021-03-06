const Sequelize = require('sequelize');
const DataTypes = require("sequelize").DataTypes;

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('softwareStatus', {
    softwareStatus_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    softwareStatus_description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'softwareStatus',
    schema: 'dbo',
    timestamps: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
  });
};
