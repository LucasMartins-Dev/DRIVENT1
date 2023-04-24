import { TicketStatus } from '@prisma/client';
import { notFoundError, paymentError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/tickets-repository';
import hotelsRepository from '@/repositories/hotels-repository';

async function getHotels(userId: number) {
  const userEnrollment = await enrollmentRepository.findUserEnrollment(userId);
  if (!userEnrollment) throw notFoundError();
  const ticket = await ticketRepository.getTicketByEnrollmentId(userEnrollment.id);
  if (!ticket) throw notFoundError();
  const ticketType = await ticketRepository.getTicketTypeById(ticket.ticketTypeId);
  if (ticket.status === TicketStatus.RESERVED) throw paymentError();
  if (ticketType.isRemote) throw paymentError();
  if (!ticketType.includesHotel) throw paymentError();
  const hotels = await hotelsRepository.findHotels();
  if (!hotels) throw notFoundError();
  return hotels;
}

async function getHotel(hotelId: number, userId: number) {
  const userEnrollment = await enrollmentRepository.findUserEnrollment(userId);
  if (!userEnrollment) throw notFoundError();
  const ticket = await ticketRepository.getTicketByEnrollmentId(userEnrollment.id);
  if (!ticket) throw notFoundError();
  const ticketType = await ticketRepository.getTicketTypeById(ticket.ticketTypeId);
  if (ticket.status === TicketStatus.RESERVED) throw paymentError();
  if (ticketType.isRemote) throw paymentError();
  if (!ticketType.includesHotel) throw paymentError();
  const hotel = await hotelsRepository.findHotel(hotelId);
  if (!hotel) throw notFoundError();
  const rooms = await hotelsRepository.findRooms(hotelId);
  if (!rooms) throw notFoundError();
  return {
    id: hotel.id,
    name: hotel.name,
    image: hotel.image,
    createdAt: hotel.createdAt,
    updatedAt: hotel.updatedAt,
    Rooms: rooms,
  };
}

const hotelsService = {
  getHotels,
  getHotel,
};
export default hotelsService;
