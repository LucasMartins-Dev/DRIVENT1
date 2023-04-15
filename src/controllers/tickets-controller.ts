import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import ticketService from '@/services/ticket-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getTickets(req: AuthenticatedRequest, res: Response , next: NextFunction){
  const { userId } = req as {userId: number};
    try {
        const tickets = await ticketService.getTickets(userId);
        res.status(httpStatus.OK).send(tickets);
      } catch (error) {
        next(error)
      }
}