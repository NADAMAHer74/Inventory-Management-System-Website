import React from 'react';
//import header, footer, outlet
import Header from './shared/Header';
import Footer from './shared/Footer';
import { Outlet } from 'react-router-dom';




function App_main() {
  return (
    <div className='App'>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
   
    
  );
}

export default App_main;
