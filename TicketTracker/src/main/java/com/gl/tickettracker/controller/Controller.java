package com.gl.tickettracker.controller;

import com.gl.tickettracker.entity.SearchItemz;
import com.gl.tickettracker.entity.Ticket;
import com.gl.tickettracker.service.TicketService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/ticket")
@CrossOrigin("*")
public class Controller {
    private TicketService ticketService;


    @PostMapping
    public ResponseEntity<Ticket> addTicket(@RequestBody Ticket ticket){
        return new ResponseEntity<>(ticketService.addTicket(ticket), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicket(@PathVariable Long id){
        return ResponseEntity.ok(ticketService.getTicket(id));

    }

    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets(){

        return ResponseEntity.ok(ticketService.getAllTickets());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(@RequestBody Ticket ticket, @PathVariable Long id){
        return ResponseEntity.ok(ticketService.updateTicket(ticket,id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTicket(@PathVariable Long id){
        return ResponseEntity.ok(ticketService.deleteTicket(id));
    }


    @GetMapping("/page/{pageNo}")
    public ResponseEntity<Page<Ticket>> findByPage(@PathVariable (value = "pageNo") int pageNo,
               @RequestParam(value = "sortBy",required = false) String sortBy,@RequestParam(value = "sortOrder", required = false) String sortOrder){

        int pageSize  = 5;
        Page<Ticket> ticketPage = ticketService.findPaginated(pageNo,pageSize, sortBy, sortOrder);
//        List<Ticket> listTickets = ticketPage.getContent();
        return ResponseEntity.ok(ticketPage);
    }

}
