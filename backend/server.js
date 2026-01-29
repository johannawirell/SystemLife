import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB-anslutning
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Mongoose-schema och modell
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

const User = mongoose.model('User', userSchema);

// Hämta profil
app.get('/profile/:email', async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Uppdatera profil
app.put('/profile/:email', async (req, res) => {
  const user = await User.findOneAndUpdate(
    { email: req.params.email },
    req.body,
    { new: true, upsert: true }
  );
  res.json(user);
});

// Starta servern
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));