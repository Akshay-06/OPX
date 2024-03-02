const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patient', {
    p_id: {
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
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },email: {
      type:DataTypes.STRING(255),
      allowNull: false,
      unique: "patient_email_key"
    },
    password: {
      type:DataTypes.STRING(50),
      allowNull: false
    },
    contact_no: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: "patient_contact_no_key"
    },email: {
      type:DataTypes.STRING(255),
      allowNull: false,
      unique: "patient_email_key"
    },
    password: {
      type:DataTypes.STRING(50),
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    hstaff_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'hospitalstaff',
        key: 'hstaff_id'
      },
      email: {
        type:DataTypes.STRING(255),
        allowNull: false,
        unique: "patient_email_key"
      },
      password: {
        type:DataTypes.STRING(50),
        allowNull: false
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
    tableName: 'patient',
    schema: 'public',
    timestamps: true,
    createdAt:'created_at',
    updatedAt:'modified_at',
    indexes: [
      {
        name: "patient_contact_no_key",
        unique: true,
        fields: [
          { name: "contact_no" },
        ]
      },
      {
        name: "patient_pkey",
        unique: true,
        fields: [
          { name: "p_id" },
        ]
      },
    ]
  });
};
