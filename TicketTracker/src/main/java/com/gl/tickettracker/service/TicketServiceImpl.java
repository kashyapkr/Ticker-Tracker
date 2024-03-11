package com.gl.tickettracker.service;

import com.gl.tickettracker.Exception.TicketNotFoundException;
import com.gl.tickettracker.entity.Ticket;
import com.gl.tickettracker.repo.TicketReposiotry;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TicketServiceImpl implements TicketService {

    private TicketReposiotry ticketReposiotry;

    @Override
    public Ticket addTicket(Ticket ticket) {
        Ticket ticketToSave = new Ticket();
        ticketToSave.setTitle(ticket.getTitle());
        ticketToSave.setDescription(ticket.getDescription());
        ticketToSave.setContent(ticket.getContent());
        return ticketReposiotry.save(ticketToSave);
    }

    @Override
    public List<Ticket> getAllTickets() {
        return ticketReposiotry.findAll().stream().collect(Collectors.toList());
    }

    @Override
    public Ticket updateTicket(Ticket ticket, Long id) {
        Ticket ticketToUpdate = ticketReposiotry.findById(id).orElseThrow(()-> new TicketNotFoundException("Ticket with this id is not found"));
        ticketToUpdate.setTitle(ticket.getTitle());
        ticketToUpdate.setDescription(ticket.getDescription());
        ticketToUpdate.setDate(ticket.getDate());
        ticketToUpdate.setContent(ticket.getContent());
        return ticketReposiotry.save(ticketToUpdate);
    }

    @Override
    public String deleteTicket(Long id) {
        ticketReposiotry.deleteById(id);
        return "Deleted Successfully";
    }

    @Override
    public Ticket getTicket(Long id) {
        return ticketReposiotry.findById(id).orElseThrow(()->new TicketNotFoundException("Ticket not found"));
    }

    @Override
    public List<Ticket> search(String title, String description) {
        return ticketReposiotry.findTicketByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(title,description);
    }

    @Override
    public Page<Ticket> findPaginated(int pageNo, int pageSize, String sortBy, String sortOrder) {
        Pageable pageable;
        if (sortBy != null && sortOrder != null) {
            Sort.Direction direction = sortOrder.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
            pageable = PageRequest.of(pageNo - 1, pageSize, direction, sortBy);
        } else {
            pageable = PageRequest.of(pageNo - 1, pageSize);
        }

        return ticketReposiotry.findAll(pageable);
    }


}
