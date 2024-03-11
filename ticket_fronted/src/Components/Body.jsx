import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { deleteTicket, getAllTickets, getTicket, getPaginatedTickets } from '../Ticket';
import img from '../img/sort.png'
import './bodystyle.scss';


const Body = () => {
    const navigator = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewticket, setViewticket] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortBy, setSortBy] = useState('date');

    useEffect(() => {
        loadTickets();
    }, [currentPage, searchTerm]);

    const handleSort = (field) => {
        // Toggle sortOrder if clicking on the same field
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');        setSortBy(field);
        loadTickets();
    }


    const loadTickets = () => {
        const pageSize = 5;
        getPaginatedTickets(currentPage, sortBy, sortOrder).then(response => {

            // console.log("length",response.data.length);
            setTickets(response.data.content);

            console.log(response.data.totalPages)

            setTotalPages(response.data.totalPages);
            console.log('totalpages', pages);

        }).catch(error => console.log(error));
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    function handelUpdate(id) {
        navigator(`/update/${id}`)
    }

    function handelView(id) {
        getTicket(id).then((response) => {
            setViewticket(response.data);
            console.log('view',viewticket)
        }).catch(error => console.log(error));
    }

    function handelDelete(id) {
        deleteTicket(id)
            .then((response) => {
                console.log(response.data);
                loadTickets();
            })
            .catch((error) => console.log(error));
    }

    console.log('totalPages', totalPages)
    const filteredTickets = tickets.filter(

        (ticket) =>
            (ticket.title && ticket.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (ticket.description && ticket.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className='container'>
            <br />
            <h1 className='text-center'>All Tickets</h1>
            
            <br />
            <div className='search mb-2'>
                <input
                    type='text'
                    className='form-control search'
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <br />
            <br />
            <table className='table  table-dark table-striped table-hover'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name
                            
                            <div className='btn-group' role='group'>
                                <button type='button' className='editButton'onClick={() => handleSort('title')}>
                                <img className='img' src= {img}  />
                                </button>
                            </div>
                        </th>
                        <th>Description</th>
                        <th>Date
                        <div className='btn-group' role='group'>
                                <button type='button' className='editButton'onClick={() => handleSort('title')}>
                                <img className='img' src= {img}  />
                                </button>
                            </div>
                        </th>
                        <th colSpan='1' className='text-center'>
                            Actions
                       </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTickets.map((ticket, index) => (
                        <tr key={ticket.id}>
                            <td>{index + 1}</td>
                            <td>{ticket.title}</td>
                            <td>{ticket.description}</td>
                            <td>{ticket.date}</td>
                            <td className='text-center'>
                                <div className='d-flex justify-content-center gap-2'>
                                    <button className='btn btn-success' onClick={() => handelUpdate(ticket.id)}>
                                        Update
                                    </button>
                                    <button className='btn btn-danger' onClick={() => handelDelete(ticket.id)}>
                                        Delete
                                    </button>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handelView(ticket.id)}>
                                        View Ticket
                                    </button>
                                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">{viewticket.title}</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                               
                                                    <p>Date: {viewticket.date}</p>
                                                    <p>Subject: {viewticket.description}</p>
                                                    <p>
                                                        <span>Description:</span>
                                                        {viewticket.content}
                                                    </p>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    {/* <button type="button" class="btn btn-primary">Understood</button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ul className="pagination">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(page)}>
                            {page}
                        </button>
                    </li>
                ))}
            </ul>


        </div>
    );
};

export default Body;
