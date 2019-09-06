const express = require('express');
const router = express.Router();
// const cData = require('../seed/data.json').courses;
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
  const course = await Courses.findAll({
     include:[
    {
      model: Users,
      as: "user"
    }]
  })
  res.json(course);
}));

router.get('/courses/:id', asyncHandler( async (req, res) => {  
  const course = await Courses.findAll({
    where: {
      id: req.params.id
    },
    include: [
    {
      model: Users,
      as: "user"
    }]
  })
 res.json(course)
}))

router.post('/courses', async (req, res, next) => {
  try {
    const course = req.body;
    const data = await Courses.create(course)
    res.location(`/courses/ ${data.userId}`)
    res.status(201);
  }
  catch (error) {
error.status = 400;
return next(error)
    // if (error.name === 'SequelizeValidationError') {
    //   const errors = error.errors.map(err => err.message);
    //   res.json(error.errors)
    //   console.error('Validation error:', errors)
    // } else {
    //   throw error;
    // }
  };
})

router.put('/courses/:id', async (req, res) => {
  try {
    const course = await Courses.findByPk(req.params.id)
    if (course) {
      await course.update(req.body);
    } else {
      res.status(404).json({ message: 'oh no' })
    }
    res.status(204).end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      // const errors = error.errors.map(err => err.message);
      // res.json(error.errors)
      res.status(404).json({ error: error.message })
      // console.error('Validation error:', errors)
    } else {
      return next(error)
    }
  }

});


router.delete('/courses/:id', async (req, res) => {
    try{const course = await Courses.findByPk(req.params.id)
    if(course){
      await course.destroy();
    }else{
      res.status(404).json({message: 'oh no'})
    }
    res.status(204).end();
  }catch(error){
      return next(error)
  }

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