const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('generates', {
    hstaff_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'hospitalstaff',
        key: 'hstaff_id'
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
    tableName: 'generates',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "generates_pkey",
        unique: true,
        fields: [
          { name: "hstaff_id" },
          { name: "invoice_no" },
        ]
      },
    ]
  });
};
