import { Router } from 'express';
import { getTickets } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicketSchema } from '@/schemas';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken);

ticketsRouter.get('/', getTickets);

//ticketsRouter.get('/types', );

//ticketsRouter.post('/', validateBody(), createTicket);

export { ticketsRouter };