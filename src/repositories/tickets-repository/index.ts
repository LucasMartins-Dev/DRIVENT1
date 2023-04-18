import { TicketStatus } from '@prisma/client';
import { prisma } from '../../config/database';

async function getTickets(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: userId,
      },
    },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: {
        select: {
          id: true,
          name: true,
          price: true,
          isRemote: true,
          includesHotel: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
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
  const ticketTypeId = ticket.ticketTypeId;
  const enrollmentId = ticket.enrollmentId;
  const newticket = await prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: TicketStatus.RESERVED,
    },
    include: {
      TicketType: true,
    },
  });

  return {
    id: newticket.id,
    status: newticket.status,
    ticketTypeId: newticket.ticketTypeId,
    enrollmentId: newticket.enrollmentId,
    TicketType: {
      id: newticket.TicketType.id,
      name: newticket.TicketType.name,
      price: newticket.TicketType.price,
      isRemote: newticket.TicketType.isRemote,
      includesHotel: newticket.TicketType.includesHotel,
      createdAt: newticket.TicketType.createdAt,
      updatedAt: newticket.TicketType.updatedAt,
    },
    createdAt: newticket.createdAt,
    updatedAt: newticket.updatedAt,
  };
}

const ticketRepository = {
  getTickets,
  getTicketsById,
  getTicketsType,
  postTicket,
};

export default ticketRepository;
