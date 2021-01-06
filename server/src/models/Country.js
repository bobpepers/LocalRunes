module.exports = (sequelize, DataTypes) => {
    const modelDefinition = {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      iso: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
    };
  
    // 2: The model options.
    const modelOptions = {
      freezeTableName: true,
    };
  
    // 3: Define the Domain model.
    const CountryModel = sequelize.define('country', modelDefinition, modelOptions);
  
    CountryModel.associate = (model) => {
      //DomainModel.hasMany(model.publisher, {
      //  as: 'publisher',
      //});
      
    };
  
    return CountryModel;
  };
  