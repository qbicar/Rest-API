module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a value for 'Title'",
        },
        notEmpty: {
          msg: "Please provide a value for 'Title'",
        }
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please provide a value for 'Author'",
        },
        notEmpty: {
          msg: "Please provide a value for 'Author'",
        }
      },
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  return Book;
};