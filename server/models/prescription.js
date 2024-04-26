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
    },
    pres_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "idx_prescription_pres_id"
    }
  }, {
    sequelize,
    tableName: 'prescription',
    timestamps: true,
    createdAt:'created_at',
    updatedAt:'modified_at',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "date_prescribed" },
          { name: "p_id" },
          { name: "doctor_id" },
        ]
      },
      {
        name: "idx_prescription_pres_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pres_id" },
        ]
      },
      {
        name: "doctor_id",
        using: "BTREE",
        fields: [
          { name: "doctor_id" },
        ]
      },
      {
        name: "prescription_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "p_id" },
        ]
      },
    ]
  });
};
