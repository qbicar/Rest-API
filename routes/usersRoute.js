const express = require('express');
const router = express.Router();
const data = require('../seed/data.json').users;
const Users = require('../models').Users;
// const auth = require('basic-auth')
// const bcryptjs = require('bcryptjs');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));



function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}
router.get('/users', asyncHandler(async (req, res) => {
  const user = await Users.findAll()
  // const user = data
  res.json(
    user
  )
  return res.status(200).end();
}));

router.post('/users', async (req, res) => {
  const user = req.body;
  try {
    const result = await Users.create(user)
    res.location('/').status(201);
    res.json({id:result.id})
  }
  catch (error) {

    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      res.json(error.errors)
      console.error('Validation error:', errors)
    } else {
      throw error;
    }
  };
});

module.exports = router;