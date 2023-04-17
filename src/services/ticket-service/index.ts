import ticketsRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError, invalidDataError } from '@/errors';

async function getTickets(userId: number) {
  const tickets = await ticketsRepository.getTickets(userId);
  return tickets;
}

async function getTicketsType() {
  const types = await ticketsRepository.getTicketsType();
  return { types };
}

async function postTicket(ticketTypeId: number, userId: number) {
  if (!ticketTypeId) throw invalidDataError(['ticket Type ID must be provided']);

  const { id: enrollmentId } = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollmentId) throw notFoundError();

  const newTicket = await ticketsRepository.postTicket({ ticketTypeId, enrollmentId });

  return { newTicket };
}

const ticketsService = {
  getTickets,
  getTicketsType,
  postTicket,
};

export default ticketsService;
