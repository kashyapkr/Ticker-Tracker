import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addTicket, getTicket, updateTicket } from '../Ticket';

const AddComponent = () => {

    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');

    const navigator = useNavigate();

    const ticket = { title: title, description: description, content: content };

    const [ticketError, setTicketError] = useState([{ title: '', description: '', content: '' }])

    function validateError() {

        let valid = true;
        const copyError = [...ticketError];

        if (title.trim() == '') {
            copyError.title = "Title should not be empty"
            valid = false;
        } else {
            copyError.title = '';
        }
        if (description.trim() === '') {
            copyError.description = 'Description should not be null';
            valid = false;
        } else {
            copyError.description = '';
        }
        if (content.trim() === '') {
            copyError.content = 'Enter a detailed description';
            valid = false;
        } else {
            copyError.description = '';
        }

        setTicketError(copyError);
        return valid;
    }


    const handelAddTicket = (e) => {
        e.preventDefault();

        if (id) {
            updateTicket(id, ticket).then(response => {
                console.log(response.data);
                navigator('/');
            }).catch(error => console.log(error));
        }
        else if (validateError()) {
            addTicket(ticket).then(reponse => {
                navigator('/');
            }).catch(error => console.log(error));
        }
        else {
            console.log("Error related to validation");
        }

    }

    function pageTitle() {
        if (id) {
            return <h2 className='card-title'>Update Ticket</h2>
        }
        else {
            return <h2 className='card-title'>Add New Ticket</h2>
        }
    }

    useEffect(() => {
        if (id) {
            getTicket(id).then((response) => {
                setTitle(response.data.title);
                setDescription(response.data.description)
                setContent(response.data.content)
            }).catch(error => console.log(error));
        }
    }, [id])




    return (
        
        <div className='container'>
            <br></br>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-body'>
                            {
                                pageTitle()
                            }
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Title:
                                    </label>
                                    <input type="text" className={`form-control ${ticketError.title ? 'is-invalid' : ''}`} placeholder='Enter a new ticket' value={title} onChange={(e) => setTitle(e.target.value)}></input>
                                    {ticketError.title && <div className='invalid-feedback'>{ticketError.title}</div>}

                                </div>
                                <br></br>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Short Description:
                                    </label><span></span>
                                    <input type="text" className={`form-control ${ticketError.description ? 'is-invalid' : ''}`} placeholder='Enter Short Description' value={description} onChange={(e) => setDescription(e.target.value)}></input>
                                    {ticketError.description && <div className='invalid-feedback'>{ticketError.description}</div>}
                                </div>
                                <br></br>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Give a Detailed Description:</label>
                                    <span></span>
                                    {/* Replace the input with a textarea */}
                                    <textarea
                                        className={`form-control ${ticketError.content ? 'is-invalid' : ''}`}
                                        placeholder='Enter Detailed Description'
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        rows={5} 
                                    ></textarea>
                                    {ticketError.content && <div className='invalid-feedback'>{ticketError.content}</div>}
                                </div>

                                <div>
                                    <button type="submit" className='btn btn-success' onClick={handelAddTicket}>Save</button>
                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddComponent