import mongoose from 'mongoose';

const coursesSchema = new mongoose.Schema({
  seqNo: {
    type: Number,
    required: true,
  },
  url: String,
  iconUrl: String,
  courseListIcon: String,
  description: String,
  longDescription: String,
  category: String,
  lessonsCount: Number,
  promo: Boolean,
});

coursesSchema.pre('remove', async function (next) {
  console.log('=== Start DELETE');
  console.log('DELETE RELATION', this._id);

  next();
});

module.exports = coursesSchema;
