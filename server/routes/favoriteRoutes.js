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
    console.log('FAVORITES',user.favorites)
    if(!user) return res.status(404).send('No user found')
    const newFavorite = req.body;
    //check for newFavorite
    if(!newFavorite) return res.status(400).send({error: 'Please Select a valid favorite.'})
    //make sure favorite doesnt match existing favorite, if filter returns true on any it will send back error response ** need to clean this up
    if(user.favorites.length > 0){
      const alreadyLiked = user.favorites.filter( userFavorite => userFavorite.id === newFavorite.id)
      //checked if filter returned anything
        if(alreadyLiked.length > 0) {
          //if so return from function
          return res.status(400).send('You have already liked this')
        }
    }
    /****** Clean UP ABOVE ******/
    
    //push new favorite to favorites array
    await user.favorites.push(newFavorite)
    //save to db
    await user.save();
    //send back user with updated favorites
    return res.send(
      'Favorite successful'
    )

  } catch (e) {
    return res.status(500).send({error: 'Server Down, please try again later.'})
  }
 
})

router.delete('/favorites', async (req,res) => {
  try {
    //find user in order to get favorites
    const user = await User.findById(req.user._id);
    if(!user) {
      return res.status(404).send({error: 'You must be authorized to view this page.'})
    }
    //loop through favorites and find it
    const newFavoritesArray =  await user.favorites.filter((favorite) => favorite.id !== req.body.id);
    // set favorites equal to new array without the deleted one
    user.favorites = newFavoritesArray;
    //save user with updated array
    await user.save();
    return res.status(200).send('Favorite Deleted')

  
  } catch (e) {
    console.error(e.message)
    return res.status(500).send({error: e.message})
  }
} )

//get request to favorites
router.get('/favorites',  async (req,res) => {
  try {
    //get user from db
    const user =  await User.findById(req.user._id)
    //check for user
    if(!user) return res.status(400).send({error: 'Can not find user'})
    //find favorites for user
    const favorites = user.favorites;
    //if no favorites return so
    if(!favorites) return res.status(400).send('No favorites found')

    //send back favorites in response
    return res.send(favorites)
  } catch (e) {
    return res.status(500).send({error: 'Server Down, please try again later.'})
  }
})


module.exports = router