import { Router } from 'express';

import { AuthenticatedRequest } from '../../middlewares/auth';
import { store } from '../../utils/store';

export const integrationsRouter = Router();

integrationsRouter.post('/health/sync', (req, res) => {
  const authReq = req as AuthenticatedRequest;
  const event = store.createEvent('integration.health.synced', authReq.user.id, req.body ?? {});

  res.json({
    status: 'synced',
    source: 'health',
    event,
  });
});

integrationsRouter.post('/linkedin/connect', (req, res) => {
  const authReq = req as AuthenticatedRequest;
  const event = store.createEvent('integration.linkedin.connected', authReq.user.id, req.body ?? {});

  res.json({
    status: 'connected',
    source: 'linkedin',
    event,
  });
});
