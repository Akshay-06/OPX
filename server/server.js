const express = require('express');
const http = require('http');
const cors = require('cors')
const {connectToDatabase} =  require('./config/dbConnector');
const userRoutes = require("./routes/userRoutes")
const staffRoutes = require("./routes/staffRoutes")

const app = express();

http.globalAgent.maxSockets = Infinity;
app.set('port', 8000);

app.use(cors())
app.use(express.json());
app.use("/users", userRoutes);
app.use("/staff", staffRoutes);
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

