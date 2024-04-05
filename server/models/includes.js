const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('includes', {
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'service',
        key: 'service_id'
      }
    },
    invoice_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'invoice',
        key: 'invoice_no'
      }
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
    tableName: 'includes',
    timestamps: true,
    createdAt:'created_at',
    updatedAt:'modified_at',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "service_id" },
          { name: "invoice_no" },
        ]
      },
      {
        name: "invoice_no",
        using: "BTREE",
        fields: [
          { name: "invoice_no" },
        ]
      },
    ]
  });
};
