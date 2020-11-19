const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  favorites: {
    type: Array
  }
})

//run before saving to encrypt password
userSchema.pre('save', function(next) {
  //set this to user var
  const user = this;
  //if password has not been modified continue
  if(!user.isModified('password')){
    return next()
  }
  bcrypt.genSalt(10, (err, salt) => {
    //if error return next(err)
    if(err) {
      return next(err)
    }
    //save user password as hash
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next()
    } )
  })
})

userSchema.methods.comparePassword = function(password) {
  const user = this;
  //check password
 return new Promise((resolve, reject) => {
   bcrypt.compare(password, user.password, (err, isMatch) => {
     //if err reject promise
     if(err) {
       return reject(err)
     }
     if(!isMatch) {
       return reject(false)
     }
     resolve(true)
   })
 })
}

//define mongoose model using user schema, set it to a reference of User
mongoose.model('User', userSchema)