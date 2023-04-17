import { prisma } from '../../config/database';

async function getPayments(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: ticketId,
    },
  });
}

const paymentsRepository = {
  getPayments,
};

export default paymentsRepository;
