
//const config = require('./config.js');
const {Sequelize} = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  dialect: 'postgres',
  pool: {
    max: 15,
    min: 5,
    idle: 20000,
    evict: 15000,
    acquire: 30000
  }, // Adjust the dialect based on your database type
});


const connectToDatabase = async () => {
    let client;
    try {
      client = await sequelize.authenticate();
      //const res = await client.query('SELECT $1::text as message', ['Connected to PostgreSQL']);
      //const message = result.rows[0].message;
      //await sequelize.sync({alter: true});
      //console.log(message);
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