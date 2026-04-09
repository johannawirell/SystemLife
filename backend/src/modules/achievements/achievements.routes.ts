import { Router } from 'express';

import { AuthenticatedRequest } from '../../middlewares/auth';
import { store } from '../../utils/store';

export const achievementsRouter = Router();

achievementsRouter.get('/', (req, res) => {
  const authReq = req as AuthenticatedRequest;
  const completedQuests = Array.from(store.quests.values()).filter(
    (quest) => quest.userId === authReq.user.id && quest.completed
  ).length;

  const achievements = [
    {
      id: 'first-quest',
      title: 'First quest completed',
      unlocked: completedQuests >= 1,
    },
    {
      id: 'quest-streak-3',
      title: 'Three quests completed',
      unlocked: completedQuests >= 3,
    },
  ];

  res.json(achievements);
});
