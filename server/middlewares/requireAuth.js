const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

//middleware function that verifies log in for every screen except signup/signin
module.exports = (req, res, next) => {
  //extract auth from header
  const { authorization } = req.headers;

  //if no auth send error
  if(!authorization) {
    return res.status(404).send({error: 'Must be logged in to view this page'})
  }
  //get rid of Bearer string in auth token
  const token = authorization.replace('Bearer ', '')
  //verify token and extract id from payload
  jwt.verify(token, 'mysecretkey', async (err, payload) => {
     //if err is present send error message
  if(err) {
    return res.status(401).send({error: 'You must be logged in. '})
  }
  //else continue
  const {userId} = payload
  //find user
  const user = User.findById(userId);
  //set req.user to the user in order to have easy access in res of app
  req.user = user;
  next()
  })
} 