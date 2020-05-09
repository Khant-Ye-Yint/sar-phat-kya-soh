const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 5000;
const path = require('path');

app.use(cors());
app.use(express.json());

//Import Routes

const bookRoute = require('./client/Routes/Book');
const recordRoute = require('./client/Routes/Record');

app.use('/books', bookRoute);
app.use('/records', recordRoute);

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//Routes
app.get('/', (req, res) => {
  res.send('We are on home');
});

//Connect to DB
mongoose.connect(
  process.env.ATLAS_URI,
  { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to DB');
  }
);

//Listen to the server
app.listen(port, () => {
  console.log(`Server is listening at ${port}...`);
});
