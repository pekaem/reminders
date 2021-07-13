module.exports = (sequelize, Sequelize) => {
  const Reminder = sequelize.define("reminder", {
    date: {
      allowNull: false,
      type: Sequelize.DATE
    },
    description: {
      allowNull: false,
      type: Sequelize.STRING
    },
    done: {
      allowNull: false,
      type: Sequelize.BOOLEAN
    },
    snoozed: {
      allowNull: false,
      type: Sequelize.BOOLEAN
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
    }
  });

  return Reminder;
};