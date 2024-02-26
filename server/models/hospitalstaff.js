const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hospitalstaff', {
    hstaff_id: {
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
    jobrole: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    department: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    contact_no: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: "hospitalstaff_contact_no_key"
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
    tableName: 'hospitalstaff',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "hospitalstaff_contact_no_key",
        unique: true,
        fields: [
          { name: "contact_no" },
        ]
      },
      {
        name: "hospitalstaff_pkey",
        unique: true,
        fields: [
          { name: "hstaff_id" },
        ]
      },
    ]
  });
};
