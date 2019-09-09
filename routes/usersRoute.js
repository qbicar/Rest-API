const express = require('express');
const router = express.Router();
const data = require('../seed/data.json').users;
const Users = require('../models').Users;
const auth = require('basic-auth')
const bcryptjs = require('bcryptjs');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const authenticatedUser = async (req, res, next) => {
  let message = null;
  const credentials = auth(req);
  if (credentials) {
    const user = await Users.findOne({ where: { emailAddress: credentials.name } });
    if (user) {
      const authenticated = bcryptjs
        .compareSync(credentials.pass, user.password);
      if (authenticated) {
        req.currentUser = user;
      } else {
        message = `Authentication failure for username: ${user.username}`;
      }
    } else {
      message = `User not found for username: ${credentials.name}`;
    }
  } else {
    message = 'Auth header not found';
  }
  if (message) {
    console.warn(message);
    res.status(401).json({ message: 'Access Denied' });
  } else {
    next();
  }
};


function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}
router.get('/users', authenticatedUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  res.json(
    user
  )
  return res.status(200).end();
}));

router.post('/users', async (req, res) => {
  const user = req.body;
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password)
      await Users.create(user)
    } else {
      await Users.create(user)
    }
    res.location('/').status(201).end();
    res.json({ id: result.id })
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