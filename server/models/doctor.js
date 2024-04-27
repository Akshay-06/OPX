const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('doctor', {
    doctor_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    specialization: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    contact_no: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: "doctor_contact_no_key"
    },
    hstaff_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'hospitalstaff',
        key: 'hstaff_id'
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
    PASSWORD: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    modified_by: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'doctor',
    createdAt:'created_at',
    updatedAt:'modified_at',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "doctor_id" },
        ]
      },
      {
        name: "doctor_contact_no_key",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "contact_no" },
        ]
      },
      {
        name: "doctor_hstaff_id_fkey",
        using: "BTREE",
        fields: [
          { name: "hstaff_id" },
        ]
      },
    ]
  });
};
