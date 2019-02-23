module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    from: {
      allowNull: false,
      type: DataTypes.STRING(64),
    },
    to: {
      allowNull: false,
      type: DataTypes.STRING(64),
    },
    data: {
      allowNull: false,
      type: DataTypes.STRING(512),
    },
    nonce: {
      allowNull: false,
      type: DataTypes.STRING(16),
    },
    gas: {
      allowNull: false,
      type: DataTypes.STRING(32),
    },
    gasPrice: {
      allowNull: false,
      type: DataTypes.STRING(16),
      field: 'gas_price',
    },
    rawTransaction: {
      allowNull: false,
      type: DataTypes.STRING(1024),
      field: 'raw_transaction',
    },
    r: {
      allowNull: false,
      type: DataTypes.STRING(128),
    },
    s: {
      allowNull: false,
      type: DataTypes.STRING(128),
    },
    v: {
      allowNull: false,
      type: DataTypes.STRING(8),
    },
    value: {
      allowNull: false,
      type: DataTypes.STRING(64),
    },
    hash: {
      allowNull: false,
      type: DataTypes.STRING(128),
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('accepted', 'broadcasted', 'confirmed', 'failed'),
    },
    fundId: {
      allowNull: true,
      type: DataTypes.BIGINT,
      field: 'fund_id',
    },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',

    underscore: true,
    tableName: 'transactions',
  });
  Transaction.associate = function (models) {
    models.Transaction.hasOne(models.TokenTx, {
      foreignKey: 'transactionId',
    });
    models.Transaction.belongsTo(models.Fund, {
      foreignKey: 'fund_id',
    });
  };
  return Transaction;
};
