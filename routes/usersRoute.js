const express = require('express');
const router = express.Router();
const data = require('../seed/data.json').users
const users = [];
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}
router.get('/users', (req, res) => {
  const user = data
  res.json(
    user
  );
  return res.status(200).end();
});

router.post('/users', asyncHandler(async (req, res) => {
  //create users
  //push something to user
  const user = req.body
  users.push(user)
  // res.redirect('/');
  res.status(201).end();
  res.send()

}));

module.exports = router;