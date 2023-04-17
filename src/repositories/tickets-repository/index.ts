import { prisma } from '../../config/database';

async function getTickets(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: userId,
    },
    include: {
      TicketType: true,
      Enrollment: {
        select: {
          userId: true,
        },
      },
    },
  });
}

async function getTicketsById(ticketId: number) {
  return await prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
      Enrollment: {
        select: {
          userId: true,
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
  return await prisma.ticket.create({
    data: {
      ...ticket,
      status: 'RESERVED',
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
