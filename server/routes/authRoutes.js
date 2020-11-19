const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//retrieve user model from mongoose
const User = mongoose.model('User')
const router = express.Router();

router.post('/signup', async (req,res) => {
  //extract name/email from req.body
  const { email, password } = req.body;
  try {
    //new user based off mongoose model
    const user = new User({email, password})
    //save user to db
    await user.save();
    //TODO: pass jwt token to user in userId, gets id from mongoose automatically assigned
    const token = jwt.sign({userId: user._id}, 'mysecretkey')
    res.send({token})
  } catch (e) {
    console.error(e.message)
    return res.status(400).send({error: 'Something went wrong with signup'})
  }
})

router.post('/signin', async (req,res) => {
  const {email, password} = req.body;
  //if no email or no password provided , return error
  if(!email || !password) {
    return res.status(404).send({error: 'Please provide a valid email and password.'})
  }
  try {
    //find user from mongoose findOne method
    const user = await User.findOne({email})
    //handle no user found case
    if(!user) {
      return res.status(400).send({error: 'User not found'})
    } 
    //compare passwords async using function in userSchema (model??)
    await user.comparePassword(password)
    //if promise returns true continue
    //return token to signinfy logged in
    const token = jwt.sign({userId: user._id}, 'mysecretkey')
    return res.send({token})

  } catch (e) {
    console.error(e.message)
    return res.status(400).send({error: 'Something went wrong with Sign in, please try again.'})
  }
})


module.exports = router