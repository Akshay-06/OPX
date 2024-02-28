const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medicalrecord', {
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'patient',
        key: 'p_id'
      }
    },
    recorddate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    diagnosis: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    tableName: 'medicalrecord',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "medicalrecord_pkey",
        unique: true,
        fields: [
          { name: "patient_id" },
          { name: "recorddate" },
        ]
      },
    ]
  });
};