import express from 'express';
import {
  getAllUsers,
  login,
  createOrUpdateProfile,
  deleteProfile,
  getProfileMe,
} from '../controllers/user-controller.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/login', login);
router.put('/profile/:email', createOrUpdateProfile);
router.delete('/profile/:email', deleteProfile);
router.get('/profile/me', getProfileMe);

export default router;