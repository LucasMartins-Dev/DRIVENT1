import { TicketType, TicketStatus } from '@prisma/client';
import { prisma } from '../../config/database';

async function findTicketTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function getTickets(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true, //join
    },
  });
}

async function getTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true, //join
    },
  });
}

async function getTicketsById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    },
  });
}

async function getTicketsType() {
  return prisma.ticketType.findMany();
}

async function getTicketTypeById(ticketTypeId: number): Promise<TicketType> {
  return prisma.ticketType.findUnique({
    where: { id: ticketTypeId },
  });
}

async function findTickeyById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    },
  });
}

async function findTickeWithTypeById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    },
  });
}

type CreateTicketType = { ticketTypeId: number; enrollmentId: number };

async function postTicket(ticket: CreateTicketType) {
  const ticketTypeId = ticket.ticketTypeId;
  const enrollmentId = ticket.enrollmentId;
  return prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId,
      status: 'RESERVED',
    },
    include: {
      TicketType: true,
    },
  });
}

async function ticketProcessPayment(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

const ticketRepository = {
  getTickets,
  getTicketByEnrollmentId,
  getTicketsById,
  getTicketsType,
  getTicketTypeById,
  postTicket,
  findTickeyById,
  findTickeWithTypeById,
  ticketProcessPayment,
};

export default ticketRepository;
