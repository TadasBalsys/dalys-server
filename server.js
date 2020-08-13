require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Models
const Test = require('./models/test/testSchema');
// const Car = require('./models/Car/car');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  MongoDB  >>>>>>>>>>>>>>>>>>>>>>>>

const mongoURL = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPSW}@dalys-server.cefjm.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((error) => console.log(error));

const PORT = process.env.PORT;

//  <<<<<<<<<<<<<<<<<<<<<<  Routes  >>>>>>>>>>>>>>>>>>>>>>>

app.get('/', (req, res) => {
  res.send('Hello world from endpoint');
});

app.post('/add', async (req, res) => {
  const { name, lastName } = req.body;
  try {
    const ansTest = new Test({ name: name, lastName: lastName });
    const result = await ansTest.save();
    res.send(result)
  } catch (error) {console.log(error)}
});

app.listen(PORT, (req, res) => console.log(`server is running on ${PORT}`));
