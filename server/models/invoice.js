const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('invoice', {
    invoice_no: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    billing_address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    invoice_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    payment_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    p_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'patient',
        key: 'p_id'
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
    },
    pres_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'prescription',
        key: 'pres_id'
      },
      unique: "idx_prescription_pres_id"
    },
    invoice_breakdown: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'invoice',
    createdAt:'created_at',
    updatedAt:'modified_at',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "invoice_no" },
        ]
      },
      {
        name: "pres_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pres_id" },
        ]
      },
      {
        name: "p_id",
        using: "BTREE",
        fields: [
          { name: "p_id" },
        ]
      },
    ]
  });
};
