import { prisma } from '@/config';

async function findHotels() {
  return prisma.hotel.findMany({});
}

async function findHotel(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
  });
}

async function findRooms(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId: hotelId,
    },
  });
}

const hotelsRepository = {
  findHotels,
  findHotel,
  findRooms,
};
export default hotelsRepository;
