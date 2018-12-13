/*
 * File that handel the posts routes
 */

 /*
  * @TODO this file is not finished
  *
  */

// const express = require('express');

// const router = express.Router();
// const Joi = require('joi');
// const mongoose = require('mongoose');
// const User = require('../models/users');


// Dependencies
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const Post = require('../models/posts');


// Dummy Data just for testing

let posts = [
  {'id': 1 ,
   'title': 'Hana',
   'desc': false,
   'numberOfLikes': 0
  },
];


// Getting all users
router.get('/', (req, res) => {
 Post.find().then(result => {
    res.send(result);
  }).catch(err => {
    res.status(400).send(err)
  })
})

// Getting information
router.get('/:id', (req, res) => {
 Post.findById(req.params.id).then(result => {
    if(!result){
      res.status(404).send('There is no such user');
    }
    res.send(result);
  }).catch(err => {
    res.status(400).send(err.message)
  });
});


// Adding a new User
router.post('/', (req, res) => {
  // Setting Schema so i can validate it
  const validating = userValidating(req.body);
  if(validating.error){
    res.status(400).send(validating.error.details);
  }else {
    const post = new Post({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      desc: req.body.desc,
      numberOfLikes:req.body.numberOfLikes
    });
    post.save()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
  }
});


// PUT
router.put('/:id', (req, res) => {
  // If req.body is valid
  const validating = userValidating(req.body);
  //  If the validation fails
  if(validating.error){
    res.status(400).send(validating.error.details);
  }else {
   Post.update({_id: req.params.id},
       { $set:{title: req.body.title,
        desc: req.body.desc,
        numberOfLikes:req.body.numberOfLikes}}
     )
    .then(result => {
      res.send(`Number of updated posts is ${result.n}`);
    }).catch(err => {
      res.status(400).send(err);
    });
  }
});


// Deleting a user
router.delete('/:id', (req, res) => {
Post.remove({_id: req.params.id}).then(result => {
    res.send(`Number of deleted posts is ${result.n}`)
  }).catch(err => {
    res.status(400).send(err);
  });
});

//  To validate the POST PUT requestes
function userValidating(post) {
  const userSchema = {
    
    'title': Joi.string().min(3).required(),
    // 'desc':Joi.Boolean().require(),
    'numberOfLikes': Joi.number().required()
  }
  return Joi.validate(post, userSchema);
}


//  Expoting the router so app.js can use it in a MiddleWare
module.exports = router;
