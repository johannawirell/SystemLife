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

app.get('/', async (req, res) => {  
  const users = await User.find({});
  console.log('Hämtar'); 
  res.send(users); 
});

// Hämta profil
app.get('/profile/:email', async (req, res) => {
  console.log('Hämtar profil');
  const user = await User.findOne({ email: req.params.email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Create or update profile with defaults
app.put('/profile/:email', async (req, res) => {
  try {
    const { email, ...bodyWithoutEmail } = req.body;

    // Defaultvärden
    const allDefaults = {
      name: 'New User',
      level: 1,
      title: 'Starter',
      balance: 0,
      class: 0,
      xpToNextLevel: 100,
      health: 0,
      economy: 0,
      social: 0,
      iq: 0,
      personality: 'N/A',
      coins: 0,
      email: req.params.email,
      avatar: '',
    };

    // Ta bara med default för fält som INTE finns i bodyWithoutEmail
    const defaults = {};
    for (const key in allDefaults) {
      if (bodyWithoutEmail[key] === undefined) {
        defaults[key] = allDefaults[key];
      }
    }

    const update = {
      $set: bodyWithoutEmail,
      $setOnInsert: defaults,
    };

    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      update,
      { new: true, upsert: true }
    );
    res.json(user);
  } catch (err) {
    console.error('Fel i /profile/:email:', err);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/profile/:email', async (req, res) => {
  try {
    const result = await User.findOneAndDelete({ email: req.params.email });
    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('Användare borttagen:', req.params.email);
    res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    console.error('Fel vid borttagning av användare:', err);
    res.status(500).json({ error: err.message });
  }
});

// Starta servern
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));