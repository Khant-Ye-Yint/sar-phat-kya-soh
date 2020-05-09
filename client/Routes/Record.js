const express = require('express');
const router = express.Router();
const Record = require('../../models/Record');
const jsonParser = express.json();

//Get all Records
router.get('/', async (req, res) => {
  try {
    const records = await Record.find().sort({ _id: -1 });
    res.json(records);
  } catch (e) {
    res.status(400).json({
      message: e,
    });
  }
});

//Get specific Record
router.get('/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    res.json(record);
  } catch (e) {
    res.status(400).json({
      message: e,
    });
  }
});

//Add new Record
router.post('/', async (req, res) => {
  const newRecord = new Record({
    bookId: req.body.bookId,
    studentId: req.body.studentId,
    admin: req.body.admin,
    returned: req.body.returned,
    date: Date.parse(req.body.date),
  });
  try {
    const addedRecord = await newRecord.save();
    res.json(addedRecord);
  } catch (e) {
    res.status(400).json({
      message: e,
    });
  }
});

//Update Record
router.patch('/:id', async (req, res) => {
  try {
    const updatedRecord = await Record.updateOne(
      { _id: req.params.id },
      {
        $set: {
          bookId: req.body.bookId,
          studentId: req.body.studentId,
          admin: req.body.admin,
          returned: req.body.returned,
          date: Date.parse(req.body.date),
        },
      }
    );
    res.status(400).json(updatedRecord);
  } catch (e) {
    res.json({
      message: e,
    });
  }
});

//Delete
router.delete('/:id', async (req, res) => {
  try {
    const deletedRecord = await Record.findByIdAndDelete(req.params.id);
    res.json(deletedRecord);
  } catch (e) {
    res.status(400).json({
      message: e,
    });
  }
});

module.exports = router;
