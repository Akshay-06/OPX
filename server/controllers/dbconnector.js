
//const config = require('./config.js');
const {Pool} = require('pg');
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


// const pool = new Pool({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   max: 20, // Maximum number of clients in the pool
//   idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
//   connectionTimeoutMillis: 2000, // Abort any connection that takes longer than 2 seconds
// });

// module.exports = pool;
