import React, {useState, useEffect} from 'react';
import {UilTrash} from '@iconscout/react-unicons';
import { toast } from 'react-toastify';
import './Notifications.css'; 
import axios from 'axios';
import Confirmation from '../Confirmation/Confirmation';
import api from '../api';
import { Rings } from 'react-loader-spinner';



const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [chargement, setChargement] = useState(false);
  const [selected, setSelected] = useState(false);
  const [id, setid] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true); 
  };

  const handleConfirmDelete = () => {
    deleteNotification(id);
    setShowModal(false); 
  };

  const handleCancelDelete = () => {
    setShowModal(false); 
  };

  const getNotifications = async () => {
    setChargement(true);
    try {
        const response = await api.get(`notif/`);
        setNotifications(response.data);

    } catch (error) {
        console.error("Erreur lors de la récupération des notifications:", error);
    }finally{
      setChargement(false);
    }
  };

  const markAsRead = async (id) => {
    try {
        await api.post(`notif/${id}/mark_as_read/`);
        getNotifications(); 
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la notification:", error);
    }
  };

  const deleteNotification = async (idNotif) => {
    try {
      await api.delete(`notif/${idNotif}/`);
      getNotifications();
      toast.success("Notification supprimée avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression de la notification:", error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  // Fonction pour grouper les notifications par date
  const groupByDate = (notifications) => {
    return notifications.reduce((acc, notification) => {
      const date = new Date(notification.date_notification).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
        })
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(notification);
      return acc;
    }, {});
  };

  const groupedNotifications = groupByDate(notifications);

  return (
    <div className="notification_Principale">
        {chargement && (
          <div className='chargement_offre'>
            <div className="chargement_offre1">
              <Rings color="#36D7B7" />
            </div>
          </div>
      )}
      <Confirmation
        show={showModal}
        title="Confirmation de suppression"
        message="Êtes-vous sûr de vouloir supprimer cette notification ?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <div className='notification'> 
        <div className='notification0'>
          <div style={{paddingLeft:'30px'}}>NOTIFICATIONS</div>
        </div>
        <div className='notification1'>
          <div className='notification2'>

            {
              Object.keys(groupedNotifications).map((date, dateIndex) => (
                <div key={dateIndex} className='notificationGroup'>

                  <div className='dateNotif'> Notification du {date}</div>


                  {
                    
                    groupedNotifications[date].map((notification, index) => (
                    /* element */
                      <div 
                        key={index} 
                        className={`contentNotification ${notification.est_lu ? 'read' : 'unread'}`}
                        onClick={() => { markAsRead(notification.id); setid(notification.id); setSelected(index); }}
                      >
                        <div>{notification.message}</div>
                        <div onClick={handleDeleteClick} className='deleteNotificationBtn'>
                          <UilTrash size="20px" color="#fff"/>
                        </div>
                      </div>

                    ))
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
