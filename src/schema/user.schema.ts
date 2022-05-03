import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  roles: Array,
  passwordHash: { type: String, required: true },
});

module.exports = userSchema;
