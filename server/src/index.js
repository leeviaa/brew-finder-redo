//require models in order to have access to them in the app
require('../models/User')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('../routes/authRoutes');
const requireAuth = require('../middlewares/requireAuth')


//init express app 
const app = express();
//automaticallly parse incoming json data
app.use(bodyParser.json())
//use authRoutes
app.use(authRoutes)
//set mongo uri
const mongoUri = 'mongodb+srv://leeviaa:Blue1357!@cluster0.lajwc.mongodb.net/brew-finder?retryWrites=true&w=majority';
//connect using mongoose
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
//check for mongo connection success
mongoose.connection.on('connected', () => {
  console.log('successfully connected to mongo')
})
//check for errors
mongoose.connection.on('error', (err) => {
  console.error('error connecting to margument', err)
})
//connect whole app to send back hi there response
app.get('/', requireAuth, (req, res) => {
  res.send('Hi There!')
})


//listen for connection to port
app.listen(3000, () => {
  console.log('Connected to port 3000')
})