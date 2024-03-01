
//const config = require('./config.js');
const {Sequelize} = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
});


const connectToDatabase = async () => {
    let client;
    try {
      client = await sequelize.authenticate();
      //await sequelize.sync({alter: true});
      return true; 
    } catch (error) {
        console.error('Error connecting to PostgreSQL:', error);
        //res.status(500).json({ error: 'Internal Server Error' });
      return false; 
    }
  };

module.exports = {
    connectToDatabase,
};
