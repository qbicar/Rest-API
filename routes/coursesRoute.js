const express = require('express');
const router = express.Router();
const Courses = require('../models').Courses;
const Users= require('../models').Users;

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

router.post('/courses', authenticatedUser, async (req, res, next) => {
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

router.put('/courses/:id', authenticatedUser, async (req, res) => {
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


router.delete('/courses/:id', authenticatedUser, async (req, res) => {
    try{
      const course = await Courses.findByPk(req.params.id)
    if(course){
      await course.destroy();
    }else{
      res.status(404).json({message: 'Error deleting , Please try again'})
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