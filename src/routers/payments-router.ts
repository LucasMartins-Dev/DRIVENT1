import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createPaymentSchema } from '@/schemas';
import { getPayments, postPayments } from '@/controllers';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken);

paymentsRouter.get('/', getPayments);

paymentsRouter.post('/process', validateBody(createPaymentSchema), postPayments);

export { paymentsRouter };
