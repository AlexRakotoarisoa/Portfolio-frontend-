import React,{useEffect,useState } from 'react'
import './Sidebar.css'
import {UilSignOutAlt} from "@iconscout/react-unicons"
import { SideBarData } from '../../Data/Data'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import api from '../api';


const Sidebar = () => {

    const [selected, setSelected] = useState(0)
    const [notificationCount, setNotificationCount] = useState(0);


    const deconnexion = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/'; 
    }


    useEffect(() => {
        // Fonction pour récupérer le nombre de notifications non lues
        const fetchNotificationCount = () => {
            api.get('notif/count/')
                .then(response => {
                    setNotificationCount(response.data.count); // On suppose que l'API renvoie { count: <nombre> }
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération des notifications", error);
                });
        };
        fetchNotificationCount();
        const intervalId = setInterval(fetchNotificationCount, 500); // 60000 ms = 1 minute
        return () => clearInterval(intervalId);
    }, []);

    
  return (
    <div className='contenuNav'>
        <div className='Sidebar'>
            <div className='logo'>
                <div className='logo1'>
                    A<span className='point'>.</span>E<span className='point'>.</span>C
                </div>
                <div className='logo2'>SARL</div> 
             </div>
        </div>

        <div className='menu'>
            {SideBarData.map((item, index) => {

                
                return(
                    
                    <NavLink  
                    to={"/dashboard"+ item.path}  
                    className={selected===index?'menuItem active':'menuItem'}
                    key={index}
                    onClick={() => setSelected(index)}
                    end={item.path === "/"}
                    >
                        <item.icon/>
                        <span>
                            {item.heading}
                            {item.heading === "Notifications" && notificationCount > 0 && (
                                <span className="notification-badge">{notificationCount}</span>
                            )}
                        </span>
                    </NavLink>
                )
            })}
            <div className='menuItem1'  onClick={deconnexion}> 
                <UilSignOutAlt/>Se deconnecter
            </div>
        </div>
      
    </div>
  )
}

export default Sidebar
