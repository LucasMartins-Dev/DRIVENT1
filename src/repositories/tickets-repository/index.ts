import { TicketType } from '@prisma/client';
import { prisma } from '../../config/database';

async function getTickets(userId: number) {
  const ticket = await prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId,
      },
    },
    include: {
      TicketType: true,
    },
  });
  return ticket;
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
      Enrollment: {
        select: {
          userId: true,
        },
      },
      TicketType: {
        select: {
          price: true,
        },
      },
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

const ticketRepository = {
  getTickets,
  getTicketByEnrollmentId,
  getTicketsById,
  getTicketsType,
  getTicketTypeById,
  postTicket,
};

export default ticketRepository;
