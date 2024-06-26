const express = require('express');
const http = require('http');
const cors = require('cors')
const {connectToDatabase} =  require('./config/dbConnector');
const staffRoutes = require("./routes/staffRoutes")
const doctorRoutes = require("./routes/doctorRoutes")
const patientRoutes = require("./routes/patientRoutes")
const app = express();

http.globalAgent.maxSockets = Infinity;
app.set('port', 8000);

app.use(cors())
app.use(express.json());
app.use("/staff", staffRoutes);
app.use("/doctor",doctorRoutes);
app.use("/patient",patientRoutes);
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

