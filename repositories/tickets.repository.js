import Ticket from '../models/tickets.model.js';
import { v4 as uuidv4 } from 'uuid';

class TicketRepository {
    async createTicket(amount, purchaser) {
        try {
            const code = uuidv4();  
            const ticket = new Ticket({
                code,
                amount,
                purchaser,
            });
            await ticket.save();
            return ticket;
        } catch (error) {
            throw error;
        }
    }
}

export default new TicketRepository();
