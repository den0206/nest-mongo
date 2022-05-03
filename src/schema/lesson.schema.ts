import * as mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  description: String,
  duration: String,
  seqNo: Number,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
});

module.exports = lessonSchema;
