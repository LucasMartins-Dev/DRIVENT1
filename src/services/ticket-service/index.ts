import ticketsRepository from '@/repositories/tickets-repository'

async function getTickets(userId: number) {
    const tickets = await ticketsRepository.getTickets(userId);
    return tickets;
  }

  const ticketsService = {
   getTickets
  };

  export default ticketsService