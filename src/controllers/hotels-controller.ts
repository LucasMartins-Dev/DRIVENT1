import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';
import { notFoundError } from '@/errors';

export async function getHotels(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const hotels = await hotelsService.getHotels(req.userId);
    if (hotels.length === 0) throw notFoundError();
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    return next(error);
  }
}

export async function getHotel(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { hotelId } = req.params;
    const hotelData = await hotelsService.getHotel(parseInt(hotelId), req.userId);
    return res.status(200).send(hotelData);
  } catch (error) {
    return next(error);
  }
}
