import React from 'react'
import {NavLink, useNavigate } from 'react-router-dom'

const Header = () => {


    const navigator = useNavigate();


  return (
    <div>
    <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className='collapse navbar-collapse'>
                <ul className='navbar-nav'>                         
                        
                            <li className='nav-item'>
                                <NavLink to='/' className='nav-link'><h4>Ticket Tracker App</h4></NavLink> </li>

                </ul>

            </div>
            <ul className='navbar-nav'>
                
                    
                   <li className='nav-item'> 
                    <NavLink to='/' className='nav-link'>All Tickets</NavLink></li>
 

            </ul>
            <ul className='navbar-nav'>
                     <li className='nav-item'> 
                         <NavLink to='/add' className='nav-link'>New Ticket</NavLink> 
                         </li>
                    
            </ul>
            
        </nav>

    </header>

</div>
  )
}

export default Header