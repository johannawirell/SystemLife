import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  title: String,
  email: String,
  level: Number,
  balance: Number,
  coins: Number,
  xpToNextLevel: Number,
  class: Number,
  health: Number,
  economy: Number,
  social: Number,
  iq: Number,
  personality: String,
  avatar: String,
});

export default mongoose.model('User', userSchema);