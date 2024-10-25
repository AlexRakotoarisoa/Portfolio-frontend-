import axios from 'axios'
import React, {useState, useEffect} from 'react'
import './Offre.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {UilTimes, UilTrash, UilEdit, UilPlusCircle,  UilUser,UilUserCircle, UilBriefcase,UilSearchAlt, UilSearch} from '@iconscout/react-unicons'
import { motion } from 'framer-motion';
import Profil from '../Profil/Profil';
import Mission from '../Mission/Mission';
import { toast } from 'react-toastify';
import { Rings } from 'react-loader-spinner';
import Confirmation from '../Confirmation/Confirmation';
import api from '../api';

const Offre = () => {


  const [date, setDate] = useState(new Date());
  const [offres, setOffres] = useState([])
  const [selected, setSelected] = useState("")
  
  const [id, setid] = useState("")
  const [titre, setTitre] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [dateEcheance, setDateEcheance] = useState("");
  const [dateEcheance1, setDateEcheance1] = useState("");
  const [statutPublication, setStatutPublication] = useState("")
  const [statutArchivage, setStatutArchivage] = useState("");

  const [ajout, setAjout] = useState(false)
  const [prof, setProf] = useState(false)
  const [miss, setMiss] = useState(false)

  const [chargement, setChargement] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [showArchivage, setShowArchivage] = useState(false);
  const [showPublication, setShowPublication] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');



  const filteredOffres = offres.filter((offre) =>
    offre.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = () => {
    setShowModal(true); 
  };

  const handleConfirmDelete = () => {
    deleteOffre(id)
    setShowModal(false); 
  };

  const handleCancelDelete = () => {
    setShowModal(false); 
  };


  const handleArchivageClick = () => {
    setShowArchivage(true); 
  };

  const handleConfirmArchivage = (e) => {
    e.preventDefault()
    Archiver(e)
    setShowArchivage(false); 
  };

  const handleCancelArchivage = () => {
    setShowArchivage(false); 
  };



  const handleCancelPublication = () => {
    setShowPublication(false); 
  };

  const handlePublicationCLick = () => {
    setShowPublication(true); 
  };

  const handleConfirmPublication = (e) => {
    e.preventDefault()
    Publier(e)
    setShowPublication(false); 
  };





  const getOffres = async () => {
    setChargement(true)
      try {
          const response = await api.get(`offre/offrenon/`)
          setOffres(response.data)
          setChargement(false)
      } catch (error) {
          console.error("Erreur de la recuperation de offre de la base de donnée:", error)
      }  }

  useEffect(() => {
    getOffres()
  }, [])

  const onChange = newDate => {
    setDate(newDate);
  };

  const voirDetail = (offre) => {
    setTitre(offre.titre) 
    setid(offre.id)
    setLocalisation(offre.localisation)
    setDateEcheance(new Date(offre.date_echeance).toISOString().split('T')[0])
    setDateEcheance1(new Date(offre.date_echeance).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
      }))
    setStatutPublication(offre.publier)
    setStatutArchivage(offre.archive)

  };


  const toogleProfil = () => {
    setProf(!prof)
  }
  const toogleMission = (id) => {
    setMiss(!miss);
  }
  
  const toogleEdit = () => {
    setAjout(!ajout);
  }


  const toogleAjout = () => {
    setAjout(!ajout);
    setSelected()
    setid("")
    setTitre("") 
    setLocalisation("")
    setDateEcheance("")
  }


 

  const formatDate = (date) => {
    const formatedDate = new Date(date).toISOString();
    return formatedDate;
  }

const deleteOffre = async (id) => {
  try {
    await api.delete(`offre/offrenon/${id}/`);
    const updatedOffres = offres.filter(offre => offre.id !== id);
    setOffres(updatedOffres);
    setid("")
    setTitre("") 
    setLocalisation("")
    setDateEcheance("")
    toast.success('Suppression réussi')
  } catch (error) {
    console.error("Erreur lors de la suppression de l'offre:", error);
  }
}

const Archiver = async (e) => {
  e.preventDefault();
  const echea = formatDate(dateEcheance);
  let formField = new FormData();
  formField.append('titre', titre);
  formField.append('localisation', localisation);
  formField.append('date_echeance', echea);
  formField.append('publier', statutPublication);
  formField.append('archive', true);
  try{
  const response = await api.put(`offre/offrenon/${id}/`, formField);
      console.log(response.data);
      getOffres()
      toast.success("Emploi archiver avec succès")
    }catch (error) {
      console.error('Erreur lors de l\'archivage de l\'emploi:', error.response ? error.response.data : error.message);
    }
}

const Publier = async (e) => {
  e.preventDefault();
  const echea = formatDate(dateEcheance);
  let formField = new FormData();
  formField.append('titre', titre);
  formField.append('localisation', localisation);
  formField.append('date_echeance', echea);
  formField.append('archive', statutArchivage);
  formField.append('publier', true)
  try{
  const response = await api.put(`offre/offrenon/${id}/`, formField);
      console.log(response.data);
      getOffres()
      toast.success("Emploi publier avec succès")
    }catch (error) {
      console.error('Erreur lors de la publication de l\'emploi:', error.response ? error.response.data : error.message);
    }
}

const ActionOffre = async (e) => {
  e.preventDefault();
  let formField = new FormData();
  const echea = formatDate(dateEcheance);

  formField.append('titre', titre.toUpperCase());
  formField.append('localisation', localisation);
  formField.append('date_echeance', echea);

  try {
    if (!id) {
      const response = await api.post('offre/offrenon/', formField);
      console.log(response.data);
      setOffres([...offres, response.data]);
      toogleAjout();
      toast.success("Ajout avec succès")
    } else {
      if (statutPublication === true){
      formField.append('publier',true)
       }
      const response = await api.put(`offre/offrenon/${id}/`, formField);
      console.log(response.data);
      const updatedOffres = offres.map(offre => 
        offre.id === id ? response.data : offre
      );
      setOffres(updatedOffres);
      toogleAjout();
      toast.success("Modification réussi")
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout ou la modification de l\'offre:', error.response ? error.response.data : error.message);
  }
};



  return (
    <div className='OffrePrincipale'>
        {chargement && (
                <div className='chargement_offre'>
                  <div className="chargement_offre1">
                    <Rings color="#36D7B7" />
                  </div>
                </div>
            )}
        <Confirmation
          show={showArchivage}
          title="Confirmation de l'archivage"
          message="Êtes-vous sûr de vouloir archiver cet emploi ?"
          onConfirm={handleConfirmArchivage}
          onCancel={handleCancelArchivage}
        />            
        <Confirmation
          show={showModal}
          title="Confirmation de suppression"
          message="Êtes-vous sûr de vouloir supprimer cet élément ?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
        <Confirmation
          show={showPublication}
          title="Confirmation de la publication"
          message="Êtes-vous sûr de vouloir publier cet emploi ?"
          onConfirm={handleConfirmPublication}
          onCancel={handleCancelPublication}
        />

{ajout && (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className='formulaireAjoutB'>

        <div className="koko">
            <div className='boutonClose'>
              <UilTimes onClick = {toogleEdit}/>
            </div>
            <h2>Offre d'emploi</h2>
            <form action="" className="contenuFormulaireAjout1" onSubmit={ActionOffre}>
                          <div className='Input_Emploi'>
                            <label htmlFor='emploi'> Nom de l'emploi</label> 
                            <input 
                            type="text" 
                            name='emploi' 

                            placeholder="Nom de l'emploi" 
                            className='NomEmploi' 
                            required value={titre} 
                            onChange={(e) => setTitre(e.target.value)}/>
                          </div>
                          <div className='Input_Emploi'>
                            <label htmlFor='localisation'> Localisation</label> 
                            <input type="text" name='localisation' placeholder='Localisation' className='NomEmploi' required value={localisation} onChange={(e) => setLocalisation(e.target.value)}/>
                          </div>
                          <div className='Input_Emploi'>
                            <label htmlFor='echeance'> Date d'échéance</label>
                            <input type="date"placeholder='date de creation' name='echeance' className='NomEmploi' required value={dateEcheance} onChange={(e) => setDateEcheance(e.target.value)}/>
                          </div>
                        <div className='AjouterEmp'>
                            <button className='btn-ajout-emploi' style={{ display: !id ? 'block' : 'none'}} >Ajouter</button>
                            <button className='btn-modification-emploi' style={{ display: id ? 'block' : 'none'}}>Modifier</button>
                        </div>
            </form>
        </div> 
    </motion.div>
 )}



{prof && (
  <motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2 }}
  className='fond-mission-profil'>
   <Profil id={id} closeProfil={toogleProfil}/>
   </motion.div>
)}
{miss && (
  <motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2 }}
  className='fond-mission-profil'>
   <Mission id={id} closeMission={toogleMission}/>
   </motion.div>
)}


      <div className='Offre'>
        <div className='offreListe'>
            <div className='headEmploi'>
                <div className='contentSearch'>
                  <input 
                  type='text' 
                  className='inputSearch' 
                  placeholder='Rechercher ... ' 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className='iconeSearch'><UilSearch color="#000000cc" size="20px"/></div>
                  </div>
            </div>

            <div className='cardOffre'>
              <div className='cardOffre1'>
                <div className='offreScroll'> 
                        {
                          filteredOffres.map((offre, index) => {
                            const dateEcheanceFormatee = new Date(offre.date_echeance).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                              })
                            
                            return (
                            <div 
                              key={index} 
                              onClick={() => {voirDetail(offre); setSelected(index)}}
                              className={selected===index?'contentOffre selectedOff':'contentOffre'}
                              > 
                                <div>{offre.titre}</div>
                                <div className='btn_Archive_Publication'>
                                  <button onClick={handleArchivageClick} className='btnArchiver'>Archiver</button>
                                  {offre.publier === false && (
                                  <button onClick={handlePublicationCLick} className='btnArchiver'>Publier</button>
                                  )}
                                </div>
                            </div>
                          );
                        })
                        }
                </div>
                </div>
            </div>
            <div className='addEmplo'>
                <div onClick={toogleAjout} id='addEmplo'>
                  <UilPlusCircle size='40px'/> 
                </div>
            </div>
        </div>
      
      </div>
      <div className='detailEmploi0'>
      <div className='detailEmploi'>
        <div className='infoEmploi'>
          <div className='containerEmploi'>
              {titre ? (
                  <>
                    <p className=''><strong>Titre :</strong> {titre} </p>
                    <p className=''><strong>Localisation :</strong> {localisation}</p>
                    <p className=''><strong>Date d'échéance :</strong> {dateEcheance1}</p>
      
                  </>
                ) :(
                  <>

                   <p className='titreEmploi'><strong>Titre :</strong> </p>
                    <p className='titreEmploi'><strong>Localisation :</strong></p>
                    <p className='titreEmploi'><strong>Date d'échéance :</strong></p>
                    </>
                )}
                </div>
                <div className='actionEmploi'>
                  <div className='act1'>
                      <div id='del1' style={{display: id ? 'block' : 'none'}} onClick={handleDeleteClick}>
                          <UilTrash size ='32px'/>
                      </div>
                      <div  id='del1' style={{display: id ? 'block' : 'none'}} onClick={toogleEdit}>
                          <UilEdit size ='30px'/>
                      </div>
                      </div>
                      <div className='act2'>
                      <div id='del1' style={{display: id ? 'block' : 'none'}} onClick={() => toogleMission(id)}>
                            <UilBriefcase size ='32px'/>
                        </div>
                        <div  id='del1' style={{display: id ? 'block' : 'none'}} onClick={() => toogleProfil(id)}>
                            <UilUserCircle size ='35px'/>
                        </div>
                        </div>
                </div>
        </div>
        <div className='calEmploi'>
          <Calendar onChange={onChange} value={date} />
        </div>
      </div>
    </div>
    </div>
  )
}

export default Offre