import axios from "axios"

const REST_API_BASE_URL = "http://localhost:8080/ticket";

export const getAllTickets = ()=>axios.get(REST_API_BASE_URL);
export const addTicket = (ticket)=>axios.post(REST_API_BASE_URL,ticket);
export const deleteTicket=(id)=>axios.delete(REST_API_BASE_URL+'/'+id);
export const getTicket=(id)=>axios.get(REST_API_BASE_URL+'/'+id);
export const updateTicket =(id,ticket)=>axios.put(REST_API_BASE_URL+'/'+id,ticket);
export const getPaginatedTickets = (pageNo, sortBy, sortOrder) =>
axios.get(`${REST_API_BASE_URL}/page/${pageNo}?sortBy=${sortBy}&sortOrder=${sortOrder}`);