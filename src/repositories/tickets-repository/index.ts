import { TicketStatus } from '@prisma/client';
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
  getTicketsById,
  getTicketsType,
  postTicket,
};

export default ticketRepository;
