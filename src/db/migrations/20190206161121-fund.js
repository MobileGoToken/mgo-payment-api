
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('funds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      from: {
        allowNull: false,
        type: Sequelize.STRING(64),
      },
      to: {
        allowNull: false,
        type: Sequelize.STRING(64),
      },
      value: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      data: {
        allowNull: true,
        type: Sequelize.STRING(128),
      },
      fee: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      user_fee: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      hmac: {
        allowNull: false,
        type: Sequelize.STRING(128),
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('accepted', 'processed', 'funded', 'confirmed', 'failed'),
        defaultValue: 'accepted',
      },
      hash: {
        allowNull: true,
        type: Sequelize.STRING(128),
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('service', 'privileged'),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('funds');
  },
};
