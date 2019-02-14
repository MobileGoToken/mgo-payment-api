module.exports = (sequelize, DataTypes) => {
  const TokenTx = sequelize.define('TokenTx', {
    transactionId: {
      allowNull: false,
      type: DataTypes.BIGINT,
      field: 'transaction_id',
    },
    to: {
      allowNull: false,
      type: DataTypes.STRING(64),
    },
    value: {
      allowNull: false,
      type: DataTypes.DOUBLE,
    },
    data: {
      allowNull: true,
      type: DataTypes.STRING(128),
    },
  },
  {
    underscore: true,
    tableName: 'token_transactions',
    timestamps: false,
  });

  TokenTx.removeAttribute('id');
  TokenTx.associate = function (models) {
    models.TokenTx.belongsTo(models.Transaction, {
      onDelete: 'CASCADE',
      foreignKey: 'transactionId',
    });
  };
  return TokenTx;
};
