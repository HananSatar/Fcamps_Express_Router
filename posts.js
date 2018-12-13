const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  //  desc:Boolean,
  numberOfLikes:Number

});

module.exports = mongoose.model('Post', userSchema);
