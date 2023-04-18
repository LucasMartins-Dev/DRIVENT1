import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentService from '@/services/payments-service';
import { Payments } from '@/protocols';

export async function getPayments(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as { userId: number };
  const { ticketId } = req.query;
  const NumTicketId = Number(ticketId);
  try {
    const payment = await paymentService.getPayments(NumTicketId, userId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send(error.message);

    if (error.name === 'UnauthorizedError') return res.status(httpStatus.UNAUTHORIZED).send(error.message);

    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
}

export async function postPayments(req: AuthenticatedRequest, res: Response) {
  const { ticketId, cardData } = req.body as Payments;
  const { userId } = req as { userId: number };
  try {
    const { newPayment } = await paymentService.postPayments({ ticketId, cardData, userId });

    return res.status(httpStatus.OK).send(newPayment);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send(error.message);

    if (error.name === 'UnauthorizedError') return res.status(httpStatus.UNAUTHORIZED).send(error.message);

    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
}
