import React, {useRef} from 'react'
import NavSite from '../NavSite/NavSite'
import Site from '../Site/Site'
import { Route, Routes } from 'react-router-dom'
import OffreCandidat from '../OffreCandidat/OffreCandidat'
import { ToastContainer } from 'react-toastify';
import ResetPassword from '../ResetPassword/ResetPassword'
import Footer from '../Footer/Footer'
import './Principale.css'

const Principale = ({isAuthenticated, setIsAuthenticated}) => {
  const scrollToSection = useRef({});
  return (
    <div>
        <ToastContainer />
        <NavSite scrollToSection={scrollToSection} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
        <div className='Principale'>
        <Routes>
            <Route path="/reset-password/:uid/:token" element={<ResetPassword/>} />
            <Route path="/"element={<Site scrollToSection={scrollToSection} />}  />
            <Route path="/Emploi" element={<OffreCandidat/>} />
        </Routes>
        <Footer scrollToSection={scrollToSection}/>
        </div>
    </div>
  )
}

export default Principale
