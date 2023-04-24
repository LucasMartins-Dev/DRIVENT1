import { prisma } from '@/config';
import { PaymentParams } from '@/protocols';

async function getPayments(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: ticketId,
    },
  });
}

async function createPayment(ticketId: number, params: PaymentParams) {
  return prisma.payment.create({
    data: {
      ticketId,
      ...params,
    },
  });
}

export default { getPayments, createPayment };
