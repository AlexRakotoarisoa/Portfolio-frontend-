import React, { useEffect, useState } from 'react';
import {
  UilUser,
  UilArrowLeft,
  UilArrowRight,
  UilMessage,
  UilEnvelope,
  UilPhone,
  UilCalendarAlt,
  UilDownloadAlt,
  UilTimes,
} from '@iconscout/react-unicons';
import axios from 'axios';
import './Candidat.css';
import { toast } from 'react-toastify';
import { Rings } from 'react-loader-spinner';
import api from '../api';
import Confirmation from '../Confirmation/Confirmation';





const Candidat = () => {
  const [offres, setOffres] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPostulations, setSelectedPostulations] = useState(Array(offres.length).fill(null));
  const [selectedCandidat, setSelectedCandidat] = useState(null);
  const [titreOffre, setTitreOffre] = useState("");
  const [panelDetail, setPanelDetail] = useState(false)
  const [panelEmail, setPanelEmail] = useState(false)
  const [emailSend, setEmailSend] = useState(false);
  const [date, setDate] = useState('');
  const [heure, setHeure] = useState('');
  const [chargementCC, setChargementCC] = useState(false)
  const [showRefus, setShowRefus] = useState(false);
  const [filtreStatut, setFiltreStatut] = useState('tous');
  const [search, setSearch] = useState('');


  const handleRefusClick = () => {
    setShowRefus(true); // Affiche le modal quand on clique sur "Supprimer"
  };

  const handleConfirmRefus = (e) => {
    e.preventDefault()
    envoyer_Mail(e,"refuse")
    setShowRefus(false); 
  };

  const handleCancelRefus = () => {
    setShowRefus(false); // Cache le modal si l'utilisateur annule
  };

  const changePanel = () => {
    if (panelDetail) {
      setPanelEmail(false);
      setTimeout(() => {
        setPanelDetail(false);
      }, 500);
    } else {
      setPanelDetail(true);
      setTimeout(() => {
        setPanelEmail(true);
      }, 500);
    }
  };

  const handleSelect = (offreIndex, postulationIndex) => {
    const newSelectedPostulations = [...selectedPostulations];
    newSelectedPostulations[offreIndex] = postulationIndex;
    setSelectedPostulations(newSelectedPostulations);
  };

  const candidatSelection = (candidat) => {
    setSelectedCandidat(candidat)
    setPanelEmail(false)
    setPanelDetail(false)
    setDate("");
    setHeure("")
  }



  const precedent = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedCandidat(null)
      setSelectedPostulations("");
      setPanelEmail(false)
      setPanelDetail(false)
      setDate("");
      setHeure("")
      setFiltreStatut('tous')
      setSearch('')
    }
  };

  const suivant = () => {
    if (currentIndex < offres.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedCandidat(null)
      setSelectedPostulations("");
      setPanelEmail(false)
      setPanelDetail(false)
      setDate("");
      setHeure("")
      setFiltreStatut('tous')
      setSearch('')
    }
  };



  useEffect(() => {
    const fetchOffres = async () => {
      setChargementCC(true)
      try {
        const response = await api.get('candidat/');
        setOffres(response.data);
        setChargementCC(false)
      } catch (err) {
        setError('Une erreur s\'est produite lors du chargement des données.');
      }
    };
    fetchOffres();
  }, []);

  useEffect(() => {
    if (offres.length > 0) {
        setTitreOffre(offres[currentIndex].titre)
    }
}, [currentIndex, offres]);



  const acceptationCandidat = (e) => {
    e.preventDefault();
    envoyer_Mail(e, "accepte")
  }

  const envoyer_Mail = async (e,statut) => {
    e.preventDefault();
    setEmailSend(true)
    const idC = selectedCandidat.id
    const dateEntre = new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
      })
    try {
      const response = await api.post(`mail/${idC}/`, {
        date:dateEntre,
        heure:heure,
        candidat:selectedCandidat.nom,
        poste:titreOffre,
        email:selectedCandidat.email,
        statut:statut
      });
 
      console.log(response); // Vérifiez le statut de la réponse ici
 
      if (statut === "accepte"){
        setDate("");
        setHeure("")
        changePanel();
      }
      if (response.status === 200) {
        toast.success(response.data.success); 
        const updatedOffres = offres.map(offre => {
          if (offre.id === offres[currentIndex].id) {
            return {
              ...offre,
              postulations: offre.postulations.map(c => {
                if (c.id === selectedCandidat.id) {
                  return { ...c, statut: statut }; 
                }
                return c;
              }),
            };
          }
          return offre;
        });
        setOffres(updatedOffres);

      }

    } catch (error) {
      console.error("Erreur capturée :", error.response || error.message); // Log de l'erreur complète
      toast.error('Erreur lors de l\'envoi de l\'email.');
    } finally{
      setEmailSend(false)
    }
  };
 


  return (
    <div className='candidatPrincipale'>
           {chargementCC && (
                  <div className='chargementCC_offre'>
                    <div className="chargementCC_offre1">
                      <Rings color="#36D7B7" />
                    </div>
                  </div>
             )}
            <Confirmation
              show={showRefus}
              title="Confirmation du refus"
              message="Êtes-vous sûr de vouloir refuser cet candidature ?"
              onConfirm={handleConfirmRefus}
              onCancel={handleCancelRefus}
            />   
             
            <div className='candidatListe'>
                <div className='listeCandidat'>
               
                  <div className= 'listeCandidat1'> 

            {offres.length > 0 ? (
              <div key={offres[currentIndex].id} className='contentCandidat'>
                <div className='nomOffre'>
                  <div className='nomOffre1'>
                    <h3>{offres[currentIndex].titre}</h3>
                    <p>Localisation : {offres[currentIndex].localisation}</p>
                    <p>Date d'échéance : { new Date(offres[currentIndex].date_echeance).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                    </p>
                    <div className="Bouton_statut">
                    <button
                      onClick={() => {setFiltreStatut('tous'); setSelectedCandidat(null); setSelectedPostulations("");}}
                      className={filtreStatut === 'tous' ? 'active-button' : ''}
                    >
                      Tous
                    </button>
                    <button
                      onClick={() => {setFiltreStatut('accepte'); setSelectedCandidat(null); setSelectedPostulations("");}}
                      className={filtreStatut === 'accepte' ? 'active-button' : ''}
                    >
                      Acceptés
                    </button>
                    <button
                      onClick={() => {setFiltreStatut('refuse'); setSelectedCandidat(null); setSelectedPostulations("");}}
                      className={filtreStatut === 'refuse' ? 'active-button' : ''}
                    >
                      Refusés
                    </button>
                    <button
                      onClick={() => {setFiltreStatut('en_attente'); setSelectedCandidat(null); setSelectedPostulations("");}}
                      className={filtreStatut === 'en_attente' ? 'active-button' : ''}
                    >
                      En attente
                    </button>
                    </div>
                    <div className="searchCandidat">
                      <div className='searchCandidat1'>
                      <input 
                        type="text" 
                        className='input_searchCand'
                        placeholder="Rechercher un candidat..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      </div>
                    </div>
                  </div>   
                </div>
        
              {/* Filtrage des candidatures */}
          {offres[currentIndex].postulations.length > 0 ? (
            <div className='candidatOffre'>
                  {offres[currentIndex].postulations
                    .filter(candidat => {
                      // Filtrer par statut
                      if (filtreStatut !== 'tous' && candidat.statut !== filtreStatut) {
                        return false;
                      }
                      // Filtrer par recherche
                      if (search && !candidat.nom.toLowerCase().includes(search.toLowerCase())) {
                        return false;
                      }
                      return true;
                    }).map((candidat, index) => (
                      <div 
                        className={selectedPostulations[currentIndex] === index ? 'avant selectedAvant ' : 'avant'}
                        key={candidat.id}  
                        onClick={() => {
                          handleSelect(currentIndex, index);
                          candidatSelection(candidat);
                        }}
                        >
                          <div className='onlyCandidat'>
                            <div className={`iconeCandidat ${candidat.statut === 'accepte' ? 'acceptedClass' : ''} ${candidat.statut === 'refuse' ? 'refusedClass' : ''}`}>
                              <UilUser color='white' size='25px' />
                            </div>
                            <div>{candidat.nom}</div>
                          </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p>Aucun candidat n'a postulé pour cette offre.</p>
              )}
            </div>
          ) : (
            <div className='contentCandidat'>
              <div className='nomOffre'>
                <div className='nomOffre1'>
                  <h3>ANTANANARIVO</h3>
                  <p>Localisation :</p>
                  <p>Date d'échéance : </p>
                </div>
              </div>
              <div className='candidatOffre'>
                <div className='avant'></div>
              </div>
            </div>
          )}
             </div>
                </div>
                <div className='navigationButtons'>
                      <button onClick={precedent} disabled={currentIndex === 0}>
                          <UilArrowLeft size="30px" color="#fff" />
                      </button>
                      <button onClick={suivant} disabled={currentIndex === offres.length - 1}>
                         <UilArrowRight size="30px" color="#fff" />
                      </button>
                    </div>
          </div>



          <div className='detailCandidat'>
            {emailSend && (
              <div className='spinner-container'>
                <div className="spinner">
                  <Rings color="#36D7B7" />
                </div>
              </div>
            )}
          {selectedCandidat ? (
              <div className='detailCandidat0'>{/*Miengobe anle 2*/}
                      <div className={`detailCandidat1 ${panelDetail ? 'activePanel' : ''}`}>
                          <div className='informationCC'>
                            <UilUser size="30px" color="#fff" />
                            <div>{selectedCandidat.nom}</div>
                          </div>
                          <div className='informationCC'>
                          <UilEnvelope size="30px" color="#fff" />
                          <div>{selectedCandidat.email}</div>
                          </div>
                          <div className='informationCC'>
                          <UilPhone size="30px" color="#fff" />
                          <div>{selectedCandidat.telephone}</div>
                          </div>
                          <div className='informationCC'>
                            <UilCalendarAlt size="30px" color="#fff" />
                            {}
                            <div>{ new Date(selectedCandidat.date_postulation).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                    })}
                            </div>
                          </div>
                          {selectedCandidat.cv && (
                          <div className='informationCC'>
                              <div className=''><strong>Cv</strong></div>
                              <div className='cvBtn'>
                                <a href={selectedCandidat.cv}  target="_blank" rel="noopener noreferrer">
                                <UilDownloadAlt size="25px" color = "#fff"/>
                                </a>
                            </div>
                          </div>
                        )}

                        <div className={`emailBtn ${selectedCandidat.statut === 'en_attente' ? '' : 'disabled'}`}>
                          <div className='emailBtn1' onClick={changePanel}>
                            <UilEnvelope size="40px" color="#fff" />
                          </div>   
                          <div className='refusBtn' onClick={handleRefusClick}>
                            <UilTimes size="30px" color="#fff" />
                          </div>
                        </div>
                    </div>


            <div className={`detailPanelEmail ${panelEmail ? 'activePanel' : ''}`}>
              <div className='btnRetour'>
                <div className='btnRetour1' onClick={changePanel}>
                  <UilArrowLeft size = '40px'/>
                </div>
              </div>
              <h3>Information de l'entretien</h3>
              <form onSubmit={acceptationCandidat} className='formulaireEmail'>
                    <div className='entretientContainer'>
                        <label>Jour :</label>    
                        <input 
                        type="date" 
                        id="dateInput" 
                        name="dateInput" 
                        className='inputEntretien'
                        value={date} // Lier l'état à l'input
                        onChange={(e) => setDate(e.target.value)}
                        required
                        />
                    </div>
                    <div className='entretientContainer'>
                        <label>Heure :</label>
                        <input 
                        type="time" 
                        id="timeInput" 
                        name="timeInput" 
                        className='inputEntretien'
                        value={heure} // Lier l'état à l'input
                        onChange={(e) => setHeure(e.target.value)}
                        required
                        />
                    </div>
                    <div className='btnSend'>
                       <button type="submit" className='btnSendMail'><UilMessage size ='30px' color = '#fff' /></button>
                    </div>
            </form>
            </div>
           
            </div>
          ) : (
            <div className='detailCandidat0'>
              <div className='detailCandidat1'>         
                <div className='informationCC'>
                  <UilUser size="30px" color="#fff" />
                  <div></div>
                </div>
                <div className='informationCC'>
                <UilEnvelope size="30px" color="#fff"/>
                <div></div>
                </div>
                <div className='informationCC'>
                <UilPhone size="30px" color="#fff" />
                <div></div>
                </div>
                <div className='informationCC'>
                  <UilCalendarAlt size="30px" color="#fff" />
                  <div></div>
                </div>
                <div className='informationCC'>
                <div className=''><strong>Cv</strong></div>
                <div></div>
                </div>
              </div>
            </div>
          ) }
            
          </div>
    </div>




);
};

export default Candidat;
