const express = require('express');
const router = express.Router();
const data = require('../seed/data.json')


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
  const courses = data.courses;
  res.json(courses);
  return res.status(200).end();
}));

router.get('/courses/:id', async (req, res) => {
  
});

router.post('/courses', asyncHandler(async (req, res) => {

}))

router.put('/courses/:id', asyncHandler(async (req, res) => {

}));

router.delete('/api/courses/:id', async (req, res) => {

})

// // router.use((req, res, next) => {
// //   new Error("not found");
// //   err.status = 404;
// //   next(err)
// // });
// // router.use((err, req, res, next) => {
// //   res.status(err.status || 500);
// //   res.json({
// //     error: {
// //       message: err.message
// //     }
// //   })
// // })

module.exports = router;