package com.gl.tickettracker.repo;

import com.gl.tickettracker.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketReposiotry extends JpaRepository<Ticket,Long> {
    List<Ticket> findTicketByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String description);

}