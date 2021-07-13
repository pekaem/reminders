module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    token: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: Sequelize.DATE
    }
  });

  return User;
};