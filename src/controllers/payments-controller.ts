import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentService from '@/services/payments-service';

export async function getPayments(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as { userId: number };
  const { ticketId } = req.query;
  const NumTicketId = Number(ticketId);
  try {
    const payment = await paymentService.getPayments(NumTicketId, userId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    next(error);
  }
}
