import { Router } from 'express';

import { requireAuth } from '../middlewares/auth';
import { achievementsRouter } from './achievements/achievements.routes';
import { activitiesRouter } from './activities/activities.routes';
import { authRouter } from './auth/auth.routes';
import { eventsRouter } from './events/events.routes';
import { goalsRouter } from './goals/goals.routes';
import { integrationsRouter } from './integrations/integrations.routes';
import { notificationsRouter } from './notifications/notifications.routes';
import { progressionRouter } from './progression/progression.routes';
import { questsRouter } from './quests/quests.routes';
import { usersRouter } from './users/users.routes';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', requireAuth, usersRouter);
apiRouter.use('/goals', requireAuth, goalsRouter);
apiRouter.use('/quests', requireAuth, questsRouter);
apiRouter.use('/events', requireAuth, eventsRouter);
apiRouter.use('/progression', requireAuth, progressionRouter);
apiRouter.use('/achievements', requireAuth, achievementsRouter);
apiRouter.use('/activities', requireAuth, activitiesRouter);
apiRouter.use('/integrations', requireAuth, integrationsRouter);
apiRouter.use('/notifications', requireAuth, notificationsRouter);
