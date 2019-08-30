const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}


router.get('/api/users', async (req, res) => {
  try {
    console.log('COnnection Successful')
    await Sequelize.authenticate();
  } catch (error) {
    console.log('Oh no')
    res.status(500).json({ message: err.message })
  }
  // try {
  //   const quotes = await records.getQuotes();
  //   res.json(quotes);
  // } catch (err) {
  //   res.status(500).json({ message: err.message })
  // }
})

router.post('/api/users', asyncHandler(async (req, res) => {
  // if (req.body.author && req.body.quote) {
  //   const quote = await records.createQuote({
  //     quote: req.body.quote,
  //     author: req.body.author
  //   })
  //   res.status(201).json(quote);
  // } else {
  //   res.status(400).json({ message: "Quote and Author Required" })
  // }
}))

//=======>course routes<=============================================

router.get('/api/courses', async (req, res) => {
  // try {
  //   const quotes = await records.getQuotes();
  //   res.json(quotes);
  // } catch (err) {
  //   res.status(500).json({ message: err.message })
  // }
})

router.get('/api/courses/:id', async (req, res) => {
  // try {
  //   const quote = await records.getQuote(req.params.id)
  //   if (quote) {
  //     res.json(quote);
  //   } else {
  //     res.status(404).json({ message: err.message })
  //   }
  // } catch (err) {
  //   res.status(500).json({ message: err.message })
  // }
});

router.post('/api/courses', asyncHandler(async (req, res) => {
  // if (req.body.author && req.body.quote) {
  //   const quote = await records.createQuote({
  //     quote: req.body.quote,
  //     author: req.body.author
  //   })
  //   res.status(201).json(quote);
  // } else {
  //   res.status(400).json({ message: "Quote and Author Required" })
  // }
}))

router.put('/api/courses/:id', asyncHandler(async (req, res) => {
  // // try {
  // const quote = await records.getQuote(req.params.id);
  // if (quote) {
  //   quote.quote = req.body.quote;
  //   quote.author = req.body.author;
  //   await records.updateQuote(quote)
  //   res.status(204).end();
  // } else {
  //   res.status(400).json({ message: "Quote Not Found" });
  // }
  // // } catch (err) {
  // //   res.status(500).json({ message: err.message });
  // // }
}));

router.delete('/api/courses/:id', async (req, res) => {
  // try {
  //   const quote = await records.getQuote(req.params.id);
  //   await records.deleteQuote(quote)
  //   res.status(204).end();
  // } catch (err) {
  //   res.status(500).json({ message: err.message })
  // }
})

router.use((req, res, next) => {
  new Error("not found");
  err.status = 404;
  next(err)
});
router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  })
})
