import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export async function getAllUsers(req, res) {
  const users = await User.find({});
  res.send(users);
}

export async function login(req, res) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
}

export async function createOrUpdateProfile(req, res) {
  try {
    const { email, ...bodyWithoutEmail } = req.body;
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
    res.status(500).json({ error: err.message });
  }
}

export async function deleteProfile(req, res) {
  try {
    const result = await User.findOneAndDelete({ email: req.params.email });
    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getProfileMe(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}