import { Router } from 'express';

import { AuthenticatedRequest } from '../../middlewares/auth';
import { store } from '../../utils/store';

export const progressionRouter = Router();

function getUserProgression(userId: string) {
  const userEvents = store.events.filter((event) => event.userId === userId);
  const completedQuests = Array.from(store.quests.values()).filter(
    (quest) => quest.userId === userId && quest.completed
  ).length;
  const xp = completedQuests * 50 + userEvents.length * 10;
  const level = Math.max(1, Math.floor(xp / 100) + 1);

  return {
    xp,
    level,
    streak: completedQuests > 0 ? Math.min(completedQuests, 7) : 0,
    completedQuests,
  };
}

progressionRouter.get('/', (req, res) => {
  const authReq = req as AuthenticatedRequest;
  res.json(getUserProgression(authReq.user.id));
});

progressionRouter.get('/history', (req, res) => {
  const authReq = req as AuthenticatedRequest;
  const history = store.events
    .filter((event) => event.userId === authReq.user.id)
    .map((event, index) => ({
      id: event.id,
      type: event.type,
      gainedXp: 10,
      totalXp: (index + 1) * 10,
      createdAt: event.createdAt,
    }));

  res.json(history);
});
