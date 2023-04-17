import { Router } from 'express';
import { getTickets, getTypeTickets, createTicket } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicketSchema } from '@/schemas';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken);

ticketsRouter.get('/', getTickets);

ticketsRouter.get('/types', getTypeTickets);

ticketsRouter.post('/', validateBody(createTicketSchema), createTicket);

export { ticketsRouter };
