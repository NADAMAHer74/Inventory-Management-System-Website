import React from 'react';
import '../warehouses/style/Header.css';
import home from '../warehouses/assets/images/homeIcon.png';
import add from '../warehouses/assets/images/add.png'
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
                  <h1>PRODUCTS</h1>

            </div>
          
        
             <button className='Add'>
                <Link to={'/AddProduct'}>
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