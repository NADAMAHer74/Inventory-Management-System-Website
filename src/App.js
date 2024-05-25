import './App.css';
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="App">
          <Topbar />   
          <div className="containerr">
               <div>
                  < Sidebar />
               </div>
               <Home/>
          </div>
         
    
</div>
  );
}

export default App;
