const express = require('express');
const http = require('http');
const {connectToDatabase} =  require('./dbconnector');
//const {staffcontroller} = require('./controllers/staffcontroller.js');

const app = express();

// Use a route to perform a simple query
http.globalAgent.maxSockets = Infinity;
app.set('port', 3000);

const init = async () => {
  //require('./router')(app);
  http.createServer(app).listen(app.get('port'), () => {
    app.set('initialized', true);
    app.emit('app:initialized');
  });
};

init();
 