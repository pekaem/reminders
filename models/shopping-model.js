module.exports = (sequelize, Sequelize) => {
  const Shopping = sequelize.define("shopping", {
    items: {
      allowNull: false,
      type: Sequelize.STRING
    },
    owner: {
      allowNull: false,
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
    },
    updatedBy: {
      allowNull: false,
      type: sequelize.STRING
    }
  });

  return Shopping;
};