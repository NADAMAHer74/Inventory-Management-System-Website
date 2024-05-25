import "./sidebar.css"
import { MdLineStyle ,MdTimeline,MdTrendingUp,MdProductionQuantityLimits,MdAttachMoney,MdOutlineManageAccounts} from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { Link } from 'react-router-dom';
import {removeAuthUser,getAuthUser } from "../../helper/Storage";


export default function sidebar() {
  const auth = getAuthUser();
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
            <h3  className="sidebarTitle">Dashboard</h3>
            <ul  className="sidebarList">
                <li className="sidebarListItem active">
                    <MdLineStyle  />
                    Home
                </li>
               
            </ul>
        </div>

{/* admin routes */}
{
  auth && auth.type === 1 && (
    <>
   <div className="sidebarMenu">
            <h3 className="sidebarTitle">ADMIN Tasks</h3>
            <ul  className="sidebarList">
            <li className="sidebarListItem">
                <MdProductionQuantityLimits /> 
                   <Link to={"/warehouses"}>
                         Manage warehouses
                   </Link>
                </li>
                
                <li className="sidebarListItem">
                    <MdOutlineManageAccounts />
                    <Link to={"/homess"}>
                    Manage supervisor
                    </Link>
                </li>
                <li className="sidebarListItem">
                <FiEye  />
                   <Link to={"/show"}>
                         Show History
                   </Link>
                </li>
            </ul>
        </div>
       



    </>
  )
}


     {/* user routes */}
{
  auth && auth.type === 0 && (
    <>


    <div className="sidebarMenu">
    <h3 className="sidebarTitle">USER tasks</h3>
    <ul  className="sidebarList">
    <li className="sidebarListItem">
        <MdTrendingUp /> 
           <Link to={"/sendreq"}>
                 Send Request
           </Link>
        </li>
        <li className="sidebarListItem">
        <FiEye /> 
           <Link to={"/show"}>
                 Show History
           </Link>
        </li>
        <li className="sidebarListItem">
        <MdAttachMoney /> 
           <Link to={"/body"}>
                 Related Products
           </Link>
        </li>
      

    </ul>
</div>


    </>
    )
  }

    

            
      </div>
    </div>
  );
}
