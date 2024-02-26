const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lab_report', {
    report_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    report_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    report_result: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    report_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
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
    }
  }, {
    sequelize,
    tableName: 'lab_report',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "lab_report_pkey",
        unique: true,
        fields: [
          { name: "report_id" },
        ]
      },
    ]
  });
};
