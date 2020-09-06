require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const app = express();

// Models
const Test = require('./models/test/testSchema');
const Model = require('./models/Car/model');
const Part = require('./models/Car/part');

// Controllers
const { addEngine } = require('./controllers/engine');
const { addPart, getCat } = require('./controllers/part');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
//  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  MongoDB  >>>>>>>>>>>>>>>>>>>>>>>>

const mongoURL = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPSW}@dalys-server.cefjm.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

// <<<<<<<<<<<<<<<<<<<<<<<<<<<  MongoDB Driver >>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// TODO: For testing

// MongoClient.connect(mongoURL, (err, client) => {
//   if (err) console.log(`Error: ${err}`);
//   const db = client.db('dalys-server');
//   // insert all app routes, etc.

//   /**
//     app.use()
//     app.get()
//     app.post()
//     app.listen()
//    */
// });

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((error) => console.log(error));

const PORT = process.env.PORT;

//  <<<<<<<<<<<<<<<<<<<<<<  Routes  >>>>>>>>>>>>>>>>>>>>>>>

app.get('/', (req, res) => {
  res.send('Hello world from endpoint');
});

// Test route

app.post('/add', async (req, res) => {
  const { name, lastName } = req.body;
  try {
    const ansTest = new Test({ name: name, lastName: lastName });
    const result = await ansTest.save();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// TODO: Refactor this route - remove || create controller && add Error Handler

app.post('/model', async (req, res) => {
  const { body } = req;
  try {
    const createdModel = new Model(body);
    const result = await createdModel.save();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.post('/engine', addEngine);

app.post('/part', addPart);

app.get('/get-cat', getCat);

//  app.get('/get-data', async (req, res) => {
//    const data = await db.collection('Categories').find().toArray();
//    // console.log(data)
//    // res.send('get data log')
//    res.send(
//      data
//        .map((product) => {
//          `
//       <h5>${product}</h5>
//       `;
//        })
//        .join(' ')
//    );
//  });

app.listen(PORT, (req, res) => console.log(`server is running on ${PORT}`));
