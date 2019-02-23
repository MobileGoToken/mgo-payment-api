module.exports = (sequelize, DataTypes) => {
  const Fund = sequelize.define('Fund', {
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
    value: {
      allowNull: false,
      type: DataTypes.DOUBLE,
    },
    data: {
      allowNull: true,
      type: DataTypes.STRING(128),
    },
    fee: {
      allowNull: false,
      type: DataTypes.DOUBLE,
      field: 'fee',
    },
    userFee: {
      allowNull: false,
      type: DataTypes.DOUBLE,
      field: 'user_fee',
    },
    hmac: {
      allowNull: false,
      type: DataTypes.STRING(128),
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('accepted', 'processed', 'funded', 'confirmed', 'failed'),
      defaultValue: 'accepted',
    },
    hash: {
      allowNull: true,
      type: DataTypes.STRING(128),
    },
    type: {
      allowNull: false,
      type: DataTypes.ENUM('service', 'privileged'),
    },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',

    underscore: true,
    tableName: 'funds',
  });
  Fund.associate = function (models) {
    models.Fund.hasOne(models.Transaction, {
      foreignKey: 'fund_id',
    });
  };
  return Fund;
};
