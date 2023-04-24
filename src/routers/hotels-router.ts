import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHotels, getHotel } from '@/controllers/hotels-controller';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken).get('/', getHotels).get('/:hotelId', getHotel);

export { hotelsRouter };
