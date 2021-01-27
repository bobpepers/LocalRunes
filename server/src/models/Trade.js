module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: [
        'init',
        'accepted',
        'disputed',
        'done',
        'disputedDone',
      ],
    },
    userOneComplete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userTwoComplete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const TradeModel = sequelize.define('trade', modelDefinition, modelOptions);

  // 4: Wallet belongs to User

  TradeModel.associate = (model) => {
    TradeModel.belongsTo(model.user, { as: 'user' });
    TradeModel.belongsTo(model.postAd, { as: 'postAd' });
  };

  // 5: Wallet has many addresses

  return TradeModel;
};
