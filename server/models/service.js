const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('service', {
    service_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    service_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "service_service_name_key"
    },
    service_fee: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    modified_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    created_by: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    modified_by: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'service',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "service_pkey",
        unique: true,
        fields: [
          { name: "service_id" },
        ]
      },
      {
        name: "service_service_name_key",
        unique: true,
        fields: [
          { name: "service_name" },
        ]
      },
    ]
  });
};
