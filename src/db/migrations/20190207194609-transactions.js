

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transactions', {
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
      data: {
        allowNull: false,
        type: Sequelize.STRING(512),
      },
      nonce: {
        allowNull: false,
        type: Sequelize.STRING(16),
      },
      gas: {
        allowNull: false,
        type: Sequelize.STRING(32),
      },
      gas_price: {
        allowNull: false,
        type: Sequelize.STRING(16),
      },
      raw_transaction: {
        allowNull: false,
        type: Sequelize.STRING(1024),
      },
      r: {
        allowNull: false,
        type: Sequelize.STRING(128),
      },
      s: {
        allowNull: false,
        type: Sequelize.STRING(128),
      },
      v: {
        allowNull: false,
        type: Sequelize.STRING(8),
      },
      value: {
        allowNull: false,
        type: Sequelize.STRING(64),
      },
      hash: {
        allowNull: false,
        type: Sequelize.STRING(128),
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('accepted', 'broadcasted', 'confirmed', 'failed'),
      },
      fund_id: {
        allowNull: true,
        type: Sequelize.BIGINT,
        references: {
          model: 'funds',
          key: 'id',
        },
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
    return queryInterface.dropTable('transactions');
  },
};
