import React, {useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Dashboard.css'
import MainDash from '../MainDash/MainDash'
import {UilUser} from '@iconscout/react-unicons'
import Sidebar from '../Sidebar/Sidebar'
import Candidat from '../Candidat/Candidat';
import Offre from '../Offre/Offre';
import Notifications from '../Notifications/Notifications';
import Archive from '../Archive/Archive';
import Statistique from '../Statistique/Statistique';
import { ToastContainer } from 'react-toastify';
import { LayoutGroup, motion } from 'framer-motion'
import Compte from '../Compte/Compte';
import BtnProfil from '../BtnProfil/BtnProfil';

const Dashboard = () => {

  const [expanded, setExpanded] = useState(true)

  const toogleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <div>
        <div className="App">
        <ToastContainer />
            <div className='AppGlass'>   
                <Sidebar/>

                <LayoutGroup>
                    {
                        expanded ? (
                          <motion.div 
                          layoutId="alex123"  // Identique pour les deux éléments
                          transition={{ duration: 0.4 }}  // Ajuste la durée de la transition
                          style={{ position: "absolute", top: "7px", right: "7px",zIndex: "800"}}
                          initial={{ opacity: 0, scale: 0.8 }}  // Apparition initiale
                          animate={{ opacity: 1, scale: 1 }}    // Animation courante
                          exit={{ opacity: 0, scale: 0.5 }}  
                        >
                          <BtnProfil setExpanded={setExpanded} />                            
                        </motion.div>
                      ) : (
                        <motion.div 
                          layoutId="alex123"  // Identique ici aussi
                          transition={{ duration: 0.4 }}  // Ajuste la durée de la transition
                          className='motion2'
                          initial={{ opacity: 0, scale: 0.8 }}  // Apparition initiale
                          animate={{ opacity: 1, scale: 1 }}    // Animation courante
                          exit={{ opacity: 0, scale: 0.5 }}  
                        >
                          <Compte setExpanded={toogleExpanded} />
                        </motion.div>
                        )
                    }
                 </LayoutGroup>

                  <Routes>
                    <Route path="/" element={<Offre/>} />
                    <Route path="/archive" element={<Archive/>} />
                    <Route path="/candidat" element={<Candidat/>} />
                    <Route path="/notification" element={<Notifications/>}/>
                    <Route path="/statistique" element={<Statistique/>} />
                  </Routes>        
            </div>
        </div>
    </div>
  )
}

export default Dashboard
