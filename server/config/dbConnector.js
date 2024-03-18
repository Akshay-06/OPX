const Sequelize = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
});


const connectToDatabase = async () => {
    let client;
    try {
      client = await sequelize.authenticate();
      
      return true; 
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        //res.status(500).json({ error: 'Internal Server Error' });
      return false; 
    }
  };

module.exports = {
    sequelize,
    connectToDatabase,
};
