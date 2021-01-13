module.exports = (sequelize, DataTypes) => {
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    currency_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Domain model.
  const CurrencyModel = sequelize.define('currency', modelDefinition, modelOptions);

  CurrencyModel.associate = (model) => {
    // DomainModel.hasMany(model.publisher, {
    //  as: 'publisher',
    // });

  };

  return CurrencyModel;
};
