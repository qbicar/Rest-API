const express = require('express');
const router = express.Router();
const cData = require('../seed/data.json').courses;
const Courses = require('../models').Courses;
const Users= require('../models').Users;
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}

router.get('/courses', asyncHandler (async (req, res) => {
  const course = cData
  res.json(course);
  return res.status(200).end();
}));

router.get('/courses/:id', asyncHandler( async (req, res) => {
  const course = await Courses.findByPk(req.params.id)
 res.json(course)
}))

router.post('/courses', asyncHandler(async (req, res) => {

}))

router.put('/courses/:id', asyncHandler(async (req, res) => {

}));

router.delete('/api/courses/:id', async (req, res) => {
    const course = await Courses.findByPk(req.params.id)
    await course.destroy();
    res.status(204).end();
});

// router.use((req, res, next) => {
//   new Error("not found");
//   err.status = 404;
//   next(err)
// });
// router.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.json({
//     error: {
//       message: err.message
//     }
//   })
// })

module.exports = router;