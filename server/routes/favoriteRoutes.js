const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth')

const User = mongoose.model('User')
const router = express.Router();

// use require auth to get access to req.user
router.use(requireAuth)
//post new favorite
router.post('/favorites', async(req,res) => {
  try {
    const user = await User.findById(req.user._id)
    const favorite = req.body;
    if(!favorite) return res.status(400).send({error: 'Please Select a valid favorite.'})
    //push new favorite to favorites array
    await user.favorites.push(favorite)
    //save to db
    await user.save();
    //send back user with updated favorites
    return res.send(user)

  } catch (e) {
    return res.status(500).send({error: 'Server Down, please try again later.'})
  }
 
})

//get request to favorites
router.get('/favorites',  async (req,res) => {
  try {
    //get user from db
    const user =  await User.findById(req.user._id)
    //check for user
    if(!user) return res.status(400).send({error: 'Can not find user'})
    //find favorites for user
    const favorites = user.favorites;
    console.log('Favorites....',favorites)
    //if no favorites return so
    if(!favorites) return res.status(400).send('No favorites found')

    //send back favorites in response
    return res.send(favorites)
  } catch (e) {
    return res.status(500).send({error: 'Server Down, please try again later.'})
  }
})


module.exports = router