import { Response } from 'express';
import httpStatus from 'http-status';
import ticketService from '@/services/ticket-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req as { userId: number };
  try {
    const tickets = await ticketService.getTickets(userId);
    res.status(httpStatus.OK).send(tickets);
    if (!tickets) throw new Error();
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getTypeTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const { types } = await ticketService.getTicketsType();
    return res.status(httpStatus.OK).send(types);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body as { ticketTypeId: number };
  const { userId } = req as { userId: number };

  try {
    const newTicket = await ticketService.postTicket(ticketTypeId, userId);

    return res.status(httpStatus.CREATED).send(newTicket);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
