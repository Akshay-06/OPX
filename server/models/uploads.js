const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('uploads', {
    hstaff_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'hospitalstaff',
        key: 'hstaff_id'
      }
    },
    report_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'lab_report',
        key: 'report_id'
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
    tableName: 'uploads',
    timestamps: true,
    indexes: [
      {
        name: "uploads_pkey",
        unique: true,
        fields: [
          { name: "hstaff_id" },
          { name: "report_id" },
        ]
      },
    ]
  });
};
