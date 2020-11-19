const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth')

const User = mongoose.model('User')
const router = express.Router();

// use require auth to get access to req.user
router.use(requireAuth)
//post new favorite
router.post('/favorites', async(req,res) => {
  const user = req.user;
  console.log('USER FROM FAVORITE ROUTES',user._id)
  return res.send('Found favorites')
})


module.exports = router