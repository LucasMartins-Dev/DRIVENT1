import {prisma} from '../../config/database'

async function getTickets(userId: number){
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

const ticketRepository = {
    getTickets,
  };

  export default ticketRepository