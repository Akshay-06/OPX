const express = require('express');
const http = require('http');
const {connectToDatabase} =  require('./controllers/dbconnector');
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

 