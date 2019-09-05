'use strict';
const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const Courses = sequelize.define('Courses', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    estimatedTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    materialsNeeded: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, { sequelize });
  Courses.associate = (models) => {
    Courses.belongsTo(models.Users);
  }
module.exports = Courses;
return Courses;
};