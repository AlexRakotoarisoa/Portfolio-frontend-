import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { UilTimes, UilTrash, UilEdit } from '@iconscout/react-unicons';
import Confirmation from '../Confirmation/Confirmation';
import api from '../api';


const Mission = ({id, closeMission}) => {
  const [emploi, setEmploi] = useState({});
  const [selectedMission, setSelectedMission] = useState("")
  const [desMission, setDesMission] = useState("")
  const [idMission, setIdMission] = useState("")
  const [errMission, setErrMission] = useState("")
  const [showModal, setShowModal] = useState(false);


  const handleDeleteClick = () => {
    setShowModal(true); // Affiche le modal quand on clique sur "Supprimer"
  };

  const handleConfirmDelete = () => {
    deleteMission(idMission)
    setShowModal(false); 
  };

  const handleCancelDelete = () => {
    setShowModal(false); // Cache le modal si l'utilisateur annule
  };

  useEffect(() => {
    if (id) {
      api.get(`offre/offrenon/${id}/`)
        .then(response => {
          setEmploi(response.data);
        })
        .catch(error => {
          console.error('Erreur lors du chargement de l\'emploi', error);
        });
    }
  }, [id]);


  const voirDetailMission = (missi) => {
    setDesMission(missi.descriptionM)
    setIdMission(missi.id)
  }
  
  const ajoutMission = async(e) => {
    e.preventDefault();
    let formField = new FormData();
  
    formField.append('descriptionM', desMission);
    formField.append('offreEmploi', id);
  
    try{
        if (desMission) {
          const response = await api.post(`mission/`, formField);
          setEmploi((prevEmploi) => ({
            ...prevEmploi,
            mission: [...prevEmploi.mission, response.data] 
          }));
          setDesMission("")
          setIdMission("")
          setSelectedMission("")
          setErrMission("")
          toast.success("Ajout avec succès")
        }else{
          setErrMission("Veuillez remplir ce champ")
        }
  }catch (error){
    console.error('Erreur lors de l\'ajout du Mission', error.response ? error.response.data : error.message);
  }
  };

  const editMission = async(e) => {
    e.preventDefault();
    let formField = new FormData();
  
    formField.append('descriptionM', desMission);
    formField.append('offreEmploi', id);
    try{
        if (desMission) {
          const response = await api.put(`mission/${idMission}/`, formField);
          setEmploi((prevEmploi) => ({
            ...prevEmploi,
            mission: prevEmploi.mission.map((mission) =>
              mission.id === idMission ? response.data : mission
            )
          }));
          setDesMission("")
          setIdMission("")
          setSelectedMission("")
          setErrMission("")
          toast.success("Modification réussi")
        }else{
          setErrMission("Veuillez remplir ce champ")
        }
  }catch (error){
    console.error('Erreur lors de la modification du mission', error.response ? error.response.data : error.message);
  }
  };


  const deleteMission = async (idMission) => {
    try {
      await api.delete(`mission/${idMission}/`);
      setEmploi((prevEmploi) => ({
        ...prevEmploi,
        mission: prevEmploi.mission.filter((mission) => mission.id !== idMission)
      }));
      setDesMission("")
      setIdMission("")
      setSelectedMission("")
      toast.success("Elément supprimer avec succès")
    } catch (error) {
      console.error("Erreur lors de la suppression de la mission:", error);
    }
  }
  
  return (
    <div className='formulaireMission'>
    <div className="profil" >
        <Confirmation
          show={showModal}
          title="Confirmation de suppression"
          message="Êtes-vous sûr de vouloir supprimer cet élément ?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />            
        <div className='content-prof-miss'>   
            <div className='closeProfil'>
              <UilTimes onClick = {closeMission}/>
            </div>
            <h3>MISSION POUR L'EMPLOI {emploi.titre}</h3>
            <div className='contenuProfil'>
                <div className='contenuSimple'>
                   <div className='listeProfil'>
                      <div className='listeProfilOffre'>
                        <div className='scrollListeProfil1'>
                            <div className='scrollListeProfil'> 
                            {
                                emploi.mission && emploi.mission.length > 0 ? (
                                  emploi.mission.map((missi, index) => (
                                    <div 
                                      key={index}  // Utilisation de l'ID ou autre identifiant unique
                                      onClick={() => {setSelectedMission(index); voirDetailMission(missi)}}
                                      className={selectedMission===index?'contentProfil selectedProfil':'contentProfil'}
                                    > 
                                      <div>{missi.descriptionM}</div>
                                    </div>
                                  ))
                                ) : (
                                  <div className='contentProfil'>Aucun mission trouvé.</div>
                                )
                            }
                            </div>
                            </div>
                      </div>
                    </div>
                  <div className='contenuP'>
                      <form action="" className="contenuFormulaireProfil">
                          <label htmlFor='description' className='mb-2'> Description de la mission</label> <br/>
                          <textarea type="date" name='description' placeholder="Profile de l'emploi" className='DescriProfil' required value={desMission} onChange={(e) => setDesMission(e.target.value)}/><br/>
                          {errMission && <p style={{ color: '#fff', fontSize: '12px' }}>{errMission}</p>}
                          <div className='AjoutProfil'>
                            <div className='btnProfil1'  style={{ display: idMission ? 'block' : 'none'}} onClick={handleDeleteClick}><UilTrash size ='35px'/></div>
                            <div className='btnProfil2' style={{ display: idMission ? 'block' : 'none'}} onClick={editMission}><UilEdit size ='35px'/></div>
                          </div>
                          <button className='btnProfilAdd' onClick={ajoutMission}>Ajouter</button>
                      </form>
                  </div>
              </div>
              </div>
              </div>
        </div> 
      </div>
  )
}

export default Mission