import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UilTimes, UilTrash, UilEdit } from '@iconscout/react-unicons'; // Assurez-vous que ces icônes sont bien importées
import axios from 'axios';
import './Profil.css'
import { toast } from 'react-toastify';
import Confirmation from '../Confirmation/Confirmation';
import api from '../api';

const Profil = ({id, closeProfil}) => {

    const [emploi, setEmploi] = useState({});
    const [selectedProfil, setSelectedProfil] = useState("")
    const [desProfil, setDesProfil] = useState("")
    const [idProfil, setIdProfil] = useState("")
    const [errProfil, setErrProfil] = useState("")
    const [showModal, setShowModal] = useState(false);

    const handleDeleteClick = () => {
      setShowModal(true); // Affiche le modal quand on clique sur "Supprimer"
    };
  
    const handleConfirmDelete = () => {
      deleteProfil(idProfil)
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

/*
      const changeDescription = (e) => {
          // Met à jour la valeur du champ
       
        if (e.target.value.trim() !== '') {
          setErrProfil('');
        }
      };*/

      const voirDetailProfil = (emplo) => {
        setDesProfil(emplo.descriptionP)
        setIdProfil(emplo.id)
      }


      const ajoutProfil = async(e) => {
        e.preventDefault();
        let formField = new FormData();
      
        formField.append('descriptionP', desProfil);
        formField.append('offreEmploi', id);
        try{
            if (desProfil) {
              const response = await api.post(`profil/`, formField);
              setEmploi((prevEmploi) => ({
                ...prevEmploi,
                profil: [...prevEmploi.profil, response.data] 
              }));
              setDesProfil("")
              setIdProfil("")
              setSelectedProfil("")
              setErrProfil("")
              toast.success("Ajout avec succès")
            }else{
              setErrProfil("Veuillez remplir ce champ")
            }
      }catch (error){
        console.error('Erreur lors de l\'ajout du profil', error.response ? error.response.data : error.message);
      }
    };
    
    const editProfil = async(e) => {
      e.preventDefault();
      let formField = new FormData();
    
      formField.append('descriptionP', desProfil);
      formField.append('offreEmploi', id);
      try{
          if (desProfil) {
            const response = await api.put(`profil/${idProfil}/`, formField);
            setEmploi((prevEmploi) => ({
              ...prevEmploi,
              profil: prevEmploi.profil.map((profil) =>
                profil.id === idProfil ? response.data : profil
              )
            }));
            setDesProfil("")
            setIdProfil("")
            setSelectedProfil("")
            setErrProfil("")
            toast.success("Modification réussi")
          }else{
            setErrProfil("Veuillez remplir ce champ")
          }
    }catch (error){
      console.error('Erreur lors de la modification du profil', error.response ? error.response.data : error.message);
    }
    };
    
    const deleteProfil = async (idProfil) => {
      try {
        await api.delete(`profil/${idProfil}/`);
        setEmploi((prevEmploi) => ({
          ...prevEmploi,
          profil: prevEmploi.profil.filter((profil) => profil.id !== idProfil)
        }));
        setDesProfil("")
        setIdProfil("")
        setSelectedProfil("")
        toast.success("Elément supprimer avec succès")
      } catch (error) {
        console.error("Erreur lors de la suppression de l'offre:", error);
      }
    }



  return ( 
    <div className='formulaireProfil'>
        <div className="profil">
          <Confirmation
            show={showModal}
            title="Confirmation de suppression"
            message="Êtes-vous sûr de vouloir supprimer cet élément ?"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
          <div className='content-prof-miss'>            
            <div className='closeProfil'>
              <UilTimes onClick = {closeProfil}/>
            </div>
            <h3>PROFIL POUR L'EMPLOI {emploi.titre}</h3>
            <div className='contenuProfil'>
                <div className='contenuSimple'>
                   <div className='listeProfil'>
                      <div className='listeProfilOffre'>
                      <div className='scrollListeProfil1'>
                            <div className='scrollListeProfil'> 
                            {
                                emploi.profil && emploi.profil.length > 0 ? (
                                  emploi.profil.map((emplo, index) => (
                                    <div 
                                      key={index}  // Utilisation de l'ID ou autre identifiant unique
                                      onClick={() => {setSelectedProfil(index); voirDetailProfil(emplo)}}
                                      className={selectedProfil===index?'contentProfil selectedProfil':'contentProfil'}
                                    > 
                                      <div>{emplo.descriptionP}</div>
                                    </div>
                                  ))
                                ) : (
                                  <div className='contentProfil'>Aucun profil trouvé.</div>
                                )
                            }
                            </div>
                          </div>
                      </div>
                    </div>
                  <div className='contenuP'>
                      <form action="" className="contenuFormulaireProfil" >
                          <label htmlFor='description'> Description du profil</label> <br/>
                          <textarea type="date" name='description' placeholder="Profile de l'emploi" className='DescriProfil' required value={desProfil} onChange={(e) => setDesProfil(e.target.value)} /><br/>
                          {errProfil && <p style={{ color: '#fff', fontSize: '12px' }}>{errProfil}</p>}
                          <div className='AjoutProfil'>
                          <div className='btnProfil1' style={{ display: idProfil ? 'block' : 'none'}}  onClick={handleDeleteClick} ><UilTrash size ='35px'/></div>
                          <div className='btnProfil2'style={{ display: idProfil ? 'block' : 'none'}} onClick={(e) => editProfil(e)}><UilEdit size ='35px'/></div>
                          </div>
                          <button className='btnProfilAdd' onClick={ajoutProfil}>Ajouter</button>
                      </form>
                      </div>
              </div>
              </div>
              </div>
        </div> 
        </div>
  )
}

export default Profil
