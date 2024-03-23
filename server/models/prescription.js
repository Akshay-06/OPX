const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('prescription', {
    date_prescribed: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    labtests: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    medication: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    p_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'patient',
        key: 'p_id'
      }
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'doctor',
        key: 'doctor_id'
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
    tableName: 'prescription',
    timestamps: true,
    createdAt:'created_at',
    updatedAt:'modified_at',
    indexes: [
      {
        name: "prescription_pkey",
        unique: true,
        fields: [
          { name: "p_id" },
          { name: "doctor_id" },
          { name: "date_prescribed" },
        ]
      },
    ]
  });
};
