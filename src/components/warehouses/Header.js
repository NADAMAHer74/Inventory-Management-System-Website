import React from 'react';
import './style/Header.css';
import title from './assets/images/homeIcon.png';
import home from './assets/images/homeIcon.png';
import add from './assets/images/add.png'
import { Link } from 'react-router-dom';
const Header = () => {
    return ( 
        <header className='main-header'>
             {/* <button className='Home'>
                <Link to={'/'}>
                    <div className='home'>
                       <div>
                           <img src={home} alt="home"/>
                       </div>
                 
                       <div>
                          <p>Home</p>
                       </div>
                    </div>
                </Link>
            </button>   */}
            
            <div className='title'>
                  <img src={title} alt="title"/>
                  <h1>warehouses</h1>

            </div>
          
        
             <button className='Add'>
                <Link to={'/warehouses/add'}>
                    <div className='add'>
                       <div>
                           <img src={add} alt="add"/>
                       </div>
                 
                       <div>
                          <p>Add</p>
                       </div>
                    </div>
                </Link>
            </button>  

           
        </header>
     );
}
 
export default Header;