const express = require('express');
const http = require('http');
const {connectToDatabase} =  require('./controllers/dbconnector');
//const userRoutes = require("./routes/userRoutes")
//const {staffcontroller} = require('./controllers/staffcontroller.js');

const app = express();

http.globalAgent.maxSockets = Infinity;
app.set('port', 3000);

app.use(express.json());
//app.use("/users", userRoutes);
app.use(express.static('public'));

const init = async () => {
  if(connectToDatabase())
  {
    console.log("connected");
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

// const express = require('express');
// const {connectToDatabase} =  require('./controllers/dbconnector');

// const app = express();

// app.get('/testDatabaseConnection', async (req, res) => {
//   try {
//     const client = await connectToDatabase();
//     const result = await client.query('SELECT $1::text as message', ['Connected to AWS RDS PostgreSQL']);
//     const message = result.rows[0].message;
//     res.json({ message });
//     client.release();
//   } catch (error) {
//     console.error('Error connecting to AWS RDS PostgreSQL:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



 