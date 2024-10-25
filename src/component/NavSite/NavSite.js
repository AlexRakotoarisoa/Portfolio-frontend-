import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UilArrowUp, UilBars, UilUserCircle, UilAngleRight } from '@iconscout/react-unicons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Rings } from 'react-loader-spinner';
import logo from "./AECV.png";
import './NavSite.css';

const NavSite = ({ scrollToSection, isAuthenticated, setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [erreur, setErreur] = useState('');
  const [login, setLogin] = useState(false);
  const [selectedAction, setSelectedAction] = useState('connexion');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [chargement, setChargement] = useState(false);
  const [nav, setNav] = useState(false);
  
  const navigate = useNavigate();

  const handleScrollToSection = (sectionRef) => {
    if (sectionRef && sectionRef.current) {
      navigate('/')
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleScrollToSectionMobile = (sectionRef) => {
    if (sectionRef && sectionRef.current) {
      setNav(false)
      setTimeout(() => {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 500);  
    }
  };
  const validationEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const isValid = emailRegex.test(value);
    
    if (!isValid) {
      toast.error('Votre adresse email est invalide.');
    }
    return isValid;
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setChargement(true)
      try {
        const response = await axios.post('http://localhost:8000/auth/jwt/create/', {
          username: username,
          password: password,
        });
        
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        toast.success("Connexion réussie.");
        
        setTimeout(() => {
          navigate('/dashboard');
          setIsAuthenticated(true);
        }, 1000);
      } catch (error) {
        toast.error("Erreur de connexion. Veuillez vérifier vos informations.");
      } finally {
        setChargement(false)
      }
  };
  

  const toggleLogin = () => {
    setLogin(!login);
  };

  const toogleNav = () => {
    setNav(!nav)
    setLogin(false)
  }

  const sendMail = async (e) => {
    e.preventDefault();
    const valid = validationEmail(email)

    if(valid){
    setChargement(true)
    setError('');
    try {
      const response = await axios.post('http://localhost:8000/auth/sendmail_password/', { email });
      toast.success(response.data.success);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Erreur lors de l'envoi de l'e-mail.");
      }
    }finally{
      setChargement(false)
    }
  }
  };

  // Ajouter un effet de défilement pour changer le fond de la navbar


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition > scrollPosition && currentScrollPosition > 100) {
        setIsVisible(false); // Cacher la navbar
        setLogin(false)
      } else {
        setIsVisible(true); // Montrer la navbar
        setLogin(false)
      }

      // Mettez à jour la position de défilement actuelle
      setScrollPosition(currentScrollPosition);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);
  

  return (
    <div>
      <nav id="navbar" className={`navbar ${isVisible ? 'visible' : 'hidden'}`}>
        <div className='navContent'>
        <NavLink to={"/"} style={{backgroundColor:'transparent'}}><img src={logo} alt="Logo" style={{ height: '40px', width: '120px',cursor:'pointer' }} /></NavLink>
          <ul>
            <li><NavLink className={'nav-link'} to={"/ "} onClick={() => handleScrollToSection(scrollToSection.current.section1)}>Accueil</NavLink></li>
            <li><NavLink className={'nav-link'} to={"/ "} onClick={() => handleScrollToSection(scrollToSection.current.section2)}>Services</NavLink></li>
            <li><NavLink className={'nav-link'} to={"/ "} onClick={() => handleScrollToSection(scrollToSection.current.section3)}>A propos</NavLink></li>        
            <li><NavLink className={'nav-link'} to={"/ "} onClick={() => handleScrollToSection(scrollToSection.current.section4)}>Membres</NavLink></li>
            <li><NavLink className={'nav-link'} to={"/Emploi/"}>Offre</NavLink></li>
            <li><NavLink className={'nav-link'} to={"/ " } onClick={() => handleScrollToSection(scrollToSection.current.section5)}>Contact</NavLink></li>
          </ul>
          <div className='Login' id='Login' onClick={toggleLogin}>Se Connecter</div>
        </div>
      </nav>
      <nav id="navbar-mobile" className={`navbar-mobile ${isVisible ? 'visible' : 'hidden'}`}>
        <div className='navContent'>
          <div onClick={toogleNav}><UilBars size='35px' color='black'/></div>
          <NavLink to={"/"} style={{backgroundColor:'transparent'}}><img src={logo} alt="Logo" style={{ height: '40px', width: '100px',cursor:'pointer' }} /></NavLink>
          <div className='Login-mobile' id='Login' onClick={toggleLogin}><UilUserCircle size='40px'/></div>
        </div>
      </nav>
      <div className={nav?'listeNav-mobile show':'listeNav-mobile'} onClick={toogleNav}>
         <div className='listeNav-mobile1'>
          <div onClick={toogleNav}><UilBars size='35px' color='white'/></div>
          <div><span><UilAngleRight /></span><NavLink className={'nav-link-mobile'} to={"/ "} onClick={() => handleScrollToSectionMobile(scrollToSection.current.section1)}>Accueil</NavLink></div>
          <div><span><UilAngleRight/></span><NavLink className={'nav-link-mobile'} to={"/ "} onClick={() => handleScrollToSectionMobile(scrollToSection.current.section2)}>Services</NavLink></div>
          <div><span><UilAngleRight/></span><NavLink className={'nav-link-mobile'} to={"/ "} onClick={() => handleScrollToSectionMobile(scrollToSection.current.section3)}>A propos</NavLink></div>
          <div><span><UilAngleRight/></span><NavLink className={'nav-link-mobile'} to={"/ "} onClick={() => handleScrollToSectionMobile(scrollToSection.current.section4)}>Membres</NavLink></div>
          <div><span><UilAngleRight/></span><NavLink className={'nav-link-mobile'} to={"/Emploi/"}>Offre</NavLink></div>
          <div><span><UilAngleRight/></span><NavLink className={'nav-link-mobile'} to={"/ " } onClick={() => handleScrollToSectionMobile(scrollToSection.current.section5)}>Contact</NavLink></div>
        </div>
     </div>



      <div className='contentPrincipale' style={{ display: login ? 'block' : 'none' }}>
      {chargement && (
                        <div className='chargement-container1'>
                          <div className="chargement">
                            <Rings color="#36D7B7" />
                          </div>
                        </div>
                      )}
        {selectedAction === 'connexion' && (
          <div className='cardLogin' id='cardLogin'>
              <form onSubmit={handleLogin} className='container'>
                <p className='p1'>Se Connecter</p>
                <div className='LogInput'>
                  <input type='text' placeholder='Nom Utilisateur' value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className='LogInput'>
                  <input type='password' placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red' }} className='p2'>{error}</p>}
                <div className='connecter'>
                  <button className='logBtn'>
                    Connecter
                  </button>
                  <div>
                  <p className='p2' onClick={() => {setSelectedAction("mdp"); setEmail("")}}>Mot de passe oublié ? Cliquer ici</p>
                  </div>
                </div>
              </form>
          </div>)}
        {selectedAction === 'mdp' && (
          <div className='cardLogin' id='cardLogin'>
              <form onSubmit={sendMail} className='container'>
                <p className='p1'>Réinitialisation du mot de passe</p>
                <div className='LogInput'>
                  <input type='email' placeholder='Adresse e-mail' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='connecter'>
                  <button className='logBtn'>
                    Envoyer
                  </button>
                  <div>
                  <p className='p2' onClick={() => {setSelectedAction("connexion"); setUsername(""); setPassword("")}}>Se connecter</p>
                  </div>
                </div>
              </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavSite;
