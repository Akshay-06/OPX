const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user',{
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(10),
      allowNull: false
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
    tableName: 'user',
    schema: 'public',
    timestamps: true
  }); 
};

// // User.findOne = async (email) => {
// //   return User.findOne({
// //     where: {
// //       email: email,
// //     },
// //   });
// // };
// // return User;
