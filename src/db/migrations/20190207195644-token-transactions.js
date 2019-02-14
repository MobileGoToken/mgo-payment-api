
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('token_transactions', {
      transaction_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'transactions',
          key: 'id',
        },
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
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('token_transactions');
  },
};
