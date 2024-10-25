import React from 'react'
import { UilMessage , UilEnvelope, UilPhone, UilAngleRight,UilMapMarker  } from '@iconscout/react-unicons';
import { NavLink } from 'react-router-dom';
import './Footer.css'

const Footer = ({scrollToSection}) => {

  const handleScrollToSection = (sectionRef) => {
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <footer className="footer" >
      <div className='footer1'>
          <div className="contact_info">
              <h3>Contactez-nous</h3>
              <div>
              <span><UilMapMarker/></span>  <span>Centre d'affaire Multiplex Androhibe(face ENAM), Box n°03</span>
              </div>
              <div>
              <span><UilPhone/></span>  <span>034 98 818 33</span>
              </div>
              <div>
              <span><UilEnvelope/></span>  <span>audits.aecsarl@gmail.com</span>
              </div>
            </div>
            <div className='racourci_nav'>
              <div onClick={() => handleScrollToSection(scrollToSection.current.section2)}>
                <span><UilAngleRight/> </span><span>Nos service</span>
              </div>
             <div> 
             <span><UilAngleRight/> </span><NavLink to={"/Emploi/"} style={{textDecoration:'none', backgroundColor:'transparent',margin:'0', padding:'0', color:'white'}}>Nos offres</NavLink>
             </div>
              <div  onClick={() => handleScrollToSection(scrollToSection.current.section4)}>
              <span><UilAngleRight/> </span><span>Nos équipes</span>
              </div>
              <div onClick={() => handleScrollToSection(scrollToSection.current.section3)}>
              <span ><UilAngleRight/> </span><span>Nos historiques</span>
              </div>        
            </div>
       </div>
       <div className='copyright'>
          <p>&copy; 2024 Audits Expertises et Contrôles. Tous droits réservés.
          </p>
      </div>
    </footer>
  )
}

export default Footer