import './style/warehouse.css';
import Header from './Header';
import WarehouseList from './WarehouseList';
import Topbar from"../topbar/Topbar"
const App = () => {
  return ( 
    <div>  <Topbar/>
   
    <div className='warehousee'>
     
        <Header/>
        <WarehouseList/>
    </div>
    </div>
    );
}
 
export default App;