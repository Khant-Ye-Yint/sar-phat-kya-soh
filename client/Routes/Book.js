const express = require('express');
const router = express.Router();
const Book = require('../../models/Book');
const jsonParser = express.json();

//Get all Books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ _id: -1 });
    res.json(books);
  } catch (e) {
    res.status(400).json({
      message: e,
    });
  }
});

//Get specific book
router.get('/:id', async (req, res) => {
  try {
    const specBook = await Book.findById(req.params.id);
    res.json(specBook);
  } catch (e) {
    res.status(400).json({
      message: e,
    });
  }
});

//Delete specific book
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    res.json(deletedBook);
  } catch (e) {
    res.status(400).json({
      message: e,
    });
  }
});

//Update Book
router.patch('/:id', jsonParser, async (req, res) => {
  try {
    const updatedBook = await Book.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          author: req.body.author,
          qty: req.body.qty,
          imgUrl: req.body.imgUrl,
        },
      }
    );
    res.json(updatedBook);
  } catch (e) {
    res.status(400).json({
      message: e,
    });
  }
});

//Add new Book
router.post('/', async (req, res) => {
  const newBook = new Book({
    name: req.body.name,
    author: req.body.author,
    qty: req.body.qty,
    imgUrl: req.body.imgUrl,
  });
  try {
    const savedBook = await newBook.save();
    res.json(savedBook);
  } catch (e) {
    res.status(400).json({
      message: e,
    });
  }
});

module.exports = router;
