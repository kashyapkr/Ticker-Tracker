package com.gl.tickettracker.service;

import com.gl.tickettracker.entity.Ticket;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TicketService {
    Ticket addTicket(Ticket ticket);
    List<Ticket> getAllTickets();
    Ticket updateTicket(Ticket ticket,Long id);
    String deleteTicket(Long id);
    Ticket getTicket(Long id);
    List<Ticket> search(String title,String description);
    Page<Ticket>findPaginated(int pageNo,int pageSize,String sortBy, String sortOrder);


}
