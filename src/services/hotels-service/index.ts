import hotelRepository from '@/repositories/hotels-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { invalidDataError, notFoundError, paymentError } from '@/errors';

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(userId);
  if (!ticket) throw notFoundError();

  const isPaymentRequired =
    ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel;

  if (isPaymentRequired) throw paymentError();

  const hotels = await hotelRepository.findHotels();
  if (hotels.length === 0) throw notFoundError();

  return hotels;
}

const hotelsService = {
  getHotels,
};

export default hotelsService;
