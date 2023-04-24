import { Payment } from '@prisma/client';
import { notFoundError, invalidDataError, unauthorizedError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';
import paymentsRepository from '@/repositories/payments-repository';
import { Payments } from '@/protocols';

async function getPayments(ticketId: number, userId: number) {
  if (!ticketId) throw invalidDataError(['Ticket ID not provided']);
  const ticket = await ticketsRepository.getTicketsById(ticketId);
  if (!ticket) throw notFoundError();
  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();
  const payment = await paymentsRepository.getPayments(ticketId);
  return payment;
}

async function postPayments({ ticketId, cardData, userId }: Payments) {
  if (!ticketId || !cardData) throw invalidDataError(['Ticket identification or card details not provided']);

  const ticket = await ticketsRepository.getTicketsById(ticketId);

  if (!ticket) throw notFoundError();

  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();

  const payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'> = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.slice(-4),
  };

  const newPayment = await paymentsRepository.createPayment(ticketId, payment);

  return { newPayment };
}

const paymentService = {
  getPayments,
  postPayments,
};

export default paymentService;
