import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketService from '@/services/ticket-service';

export async function getTickets(req: Request, res: Response){
    try {
        const tickets = await ticketService.getTickets();
        res.send(tickets);
      } catch (e) {
        console.log(e);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
}