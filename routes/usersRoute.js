const express = require('express');
const router = express.Router();
const data = require('../seed/data.json').users;


const Users= require('../models').Users;
// const auth = require('basic-auth')
// const bcryptjs = require('bcryptjs');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));
// const users = [];


function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}
router.get('/users',asyncHandler(async (req, res) => {
  const user = data
  res.json(
    user
  );
  return res.status(200).end();
}));

router.post('/users',  (req, res) => {
  // if(req.body.password){
  //   req.body.password =  bcryptjs.hashSync(req.body.password);
  //    Users.create(req.body);
  //   res.location('/');
  //   res.status(201).end();
  // }else{
  //   res.status(401).end();
  //   console.log('oh nooo')
  // }
  // try{
  //   const { firstName, lastName, emailAddress, password } = req.body
  //   await Users.create({
  //     firstName, 
  //     lastName, 
  //     emailAddress, 
  //     password
  //   })
  // }catch(error){
  //   console.log('oh no')
  // }
  //   //create users
  // //push something to user
  // const user = req.body
  // users.push(user)
  // // res.redirect('/');
  // res.status(201).end();
  // res.send()

});

module.exports = router;