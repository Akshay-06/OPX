const express = require('express');
const http = require('http');
const {connectToDatabase} =  require('./controllers/dbconnector');
//const User = require('./models/user');
const userRoutes = require("./routes/userRoutes")
//const {staffcontroller} = require('./controllers/staffcontroller.js');

const app = express();

http.globalAgent.maxSockets = Infinity;
app.set('port', 3000);

app.use(express.json());
app.use("/users", userRoutes);
app.use(express.static('public'));

const init = async () => {
  if(connectToDatabase())
  {
    //await sequelize.sync({alter: true});
    http.createServer(app).listen(app.get('port'), () => {
      app.set('initialized', true);
      app.emit('app:initialized');
    });
  }
  else{
    console.log("Error connecting to Database");
  }
};

init();

//
// app.get('/user/:email', async (req, res) => {
//   try {
//     const email = req.params.email;
//     const user = await User.findOne({
//       where: {
//         email: email,
//       },
//     });

//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });





// server.js

// const express = require('express');
// const { Sequelize, DataTypes } = require('sequelize');
// require('dotenv').config();

// // Initialize Express
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Initialize Sequelize
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: 'postgres',
//   logging: false, // Set to console.log to see generated SQL queries
// });

// // Define the User model
// const User = sequelize.define('user',{
//   user_id: {
//     //autoIncrement: true,
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: {
//     type: DataTypes.STRING(50),
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING(100),
//     allowNull: false,
//     primary:true
//   },
//   password: {
//     type: DataTypes.STRING(10),
//     allowNull: false
//   },
//   modified_at: {
//     type: DataTypes.DATE,
//     allowNull: true
//   },
//   created_by: {
//     type: DataTypes.STRING(50),
//     allowNull: false
//   },
//   modified_by: {
//     type: DataTypes.STRING(50),
//     allowNull: false
//   }
// }, {
//   sequelize,
//   tableName: 'user',
//   schema: 'public',
//   timestamps: true,
//   updatedAt: 'modified_at',
//   createdAt: 'created_at'
// });

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Route to fetch a user by email
// app.get('/user/:email', async (req, res) => {
//   try {
//     const user = await User.findOne({ where: { email: req.params.email } });
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).send('User not found');
//     }
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // Start the server
// app.listen(PORT, async () => {
//   console.log(`Server running on http://localhost:${PORT}`);
//   try {
//     await sequelize.authenticate();
//     await sequelize.sync();
//     console.log('Connection has been established successfully.');
//     // Uncomment the following line if you need to sync models
//     // await sequelize.sync({ force: true }); // Use { force: true } with caution in production
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// });

 