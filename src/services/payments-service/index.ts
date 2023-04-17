import { notFoundError, invalidDataError, unauthorizedError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';
import paymentsRepository from '@/repositories/payments-repository';

async function getPayments(ticketId: number, userId: number) {
  if (!ticketId) throw invalidDataError(['Ticket ID must be provided']);
  const ticket = await ticketsRepository.getTicketsById(ticketId);
  if (!ticket) throw notFoundError();
  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();
  const payment = await paymentsRepository.getPayments(ticketId);
  return { payment };
}

const paymentService = {
  getPayments,
};

export default paymentService;
