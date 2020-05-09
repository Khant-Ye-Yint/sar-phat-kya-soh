const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  bookId: { type: String, required: true },
  studentId: { type: String, required: true },
  admin: { type: String, required: true },
  returned: { type: Boolean, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Record', RecordSchema);
