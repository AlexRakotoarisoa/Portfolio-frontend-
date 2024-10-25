import React from 'react'
import './Confirmation.css'

const Confirmation = ({ show, title, message, onConfirm, onCancel }) => {
    if (!show) {
      return null; // Ne rien afficher si le modal est caché
    }
  
    return (
      <div className="confirmation_Container">
        <div className="confirmation_Component">
          <h4>{title}</h4>
          <p style={{fontSize:'15px'}}>{message}</p>
          <div className="confirmation_Bouton">
            <button className="confirm-btn" onClick={onConfirm}>Confirmer</button>
            <button className="cancel-btn" onClick={onCancel}>Annuler</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Confirmation;