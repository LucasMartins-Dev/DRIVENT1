import {prisma} from '../../config/database'

async function getTickets(){
    return prisma.ticket.findMany()
}

const ticketRepository = {
    getTickets,
  };

  export default ticketRepository