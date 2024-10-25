import React, { useEffect, useState, useRef } from 'react';
import { UilArrowUp, UilAngleLeft, UilAngleRight  } from '@iconscout/react-unicons';
import '../../App.css'
import './Site.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ServiceData } from '../../Data/Data'
import ligne from './ligne.png'
import CardService from '../CardService/CardService';
import Slider from 'react-slick';
import { Link } from 'react-scroll';
import CardTeam from '../CardTeam/CardTeam';
import Map from '../Map/Map';
import 'leaflet/dist/leaflet.css';
import { toast } from 'react-toastify';
import { Rings } from 'react-loader-spinner';
import axios from 'axios';
import InputMask from 'react-input-mask';
import Footer from '../Footer/Footer';
import { NavLink } from 'react-router-dom';

const CustomPrevArrow = ({ onClick }) => {
  return (
    <div className="prev" onClick={onClick}>
      <UilAngleLeft size="60px" color="#e1d5d5" />
    </div>
  );
};

const CustomNextArrow = ({ onClick }) => {
  return (
    <div className="next" onClick={onClick}>
      <UilAngleRight size="60px" color="#e1d5d5" />
    </div>
  );
};

const Site = ({ scrollToSection }) => {

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);

  scrollToSection.current = {
    section1: section1Ref,
    section2: section2Ref,
    section3: section3Ref,
    section4: section4Ref,
    section5: section5Ref,
  };

  const [isVisible, setIsVisible] = useState(false);
  const latitude =  -18.862232; // Ex: latitude de la Tour Eiffel
  const longitude = 47.536638 ;
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [message, setMessage] = useState('')
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)
  const [expandedAbout, setExpandedAbout] = useState(false)


  const toogleExpanded = () => {
    setExpandedAbout(!expandedAbout)
  }

  const selectionEmail = (e) => {
    const value = e.target.value 
    setEmail(value)
    setErreur(false)
  }

  const selectionNumero = (e) => {
    setNumber(e.target.value)
  }
  const validationEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const isValid = emailRegex.test(value);
    
    if (!isValid) {
      toast.error('Votre adresse email est invalide.');
      setErreur(true)
    }
    return isValid;
  };

  const envoyerMessage = async (e) => {
    e.preventDefault();
    const valid = validationEmail(email)
    if(valid){
      const num = number.replace(/\s+/g, '');
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('email', email);
      formData.append('number', num);
      formData.append('message', message);
      setChargement(true)
      try {
          const response = await axios.post('http://localhost:8000/api/contact/', formData);
              setNom ("")
              setEmail ("")
              setNumber ("")
              setMessage('')
              setErreur(false)

              toast.success("Message envoyé avec succès !");
        } catch (error) {
          if (error.response && error.response.status === 400) {
            const errorMsg = error.response.data.error;
            if (errorMsg) {
                toast.warn(errorMsg); // Utilise react-toastify pour afficher une notification d'erreur
                setErreur(true)
              } else {
                toast.error("Une erreur s'est produite. Veuillez réessayer.");
            }
          } else {
            const errorMsg = error.response.data.error;
            toast.error(errorMsg);
          }
        }finally{
          setChargement(false)
        }
      }
  };



  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    const handleScroll = () => {
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          section.classList.add('in-view');
        }
      });
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Le nombre de services à afficher simultanément
    slidesToScroll: 1,// Flèche personnalisée
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Le nombre de services à afficher simultanément
    slidesToScroll: 1,// Flèche personnalisée
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Le nombre de services à afficher simultanément
    slidesToScroll: 1,// Flèche personnalisée
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };


  return (
    <div className="Site" >
      <section className='fixedImage'>
         <div className='fondFixed'>
          </div>
      </section>
      

      <section id="hero" className="hero" ref={section1Ref}>
          <div className='image1'>
            <div className='fondNoir'>
              <div className='content0'>
                <div className='content'>
                  <p className='descriAccueil'>AUDITS, EXPERTISES ET CONTROLES</p>
                  <p className='titreAcceuil'>Entreprise spécialisée dans des services variés, allant du contrôle de marchandises au reboisement et nettoyage, avec un engagement pour la qualité et l'excellence.</p>
                   <Link
                      className='btn'
                      to="contact"
                      spy={true}
                      smooth={true}
                      duration={2000} // durée de la transition en millisecondes (ici 0.5 seconde)
                    >Contactez nous</Link>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="section1" ref={section2Ref}>
          <div className="serviceAEC" id='Section1'>
            <div className='content_titre' >
              <div className='ligne' >
                  <div className='txtNav'>
                    <p>Nos services</p>
                  </div>
                  <div className='traitNav'>
                     <img src={ligne} alt='ligne'/>
                  </div>
              </div>
                  <p>Nous avons pour objet de faire directement ou indirectement, ou par l'intermédiaire des filiales, à l'intérieur ou à l'extérieur de Madagascar toute activité de prestations de services liées à différentes opération ou activité.</p>
            </div>
            <div className='carous_container'>
            <Slider {...settings}>
            {ServiceData.map((service, id) =>{
            return(
                    <CardService 
                      image={service.image}
                      titre={service.titre}
                      description={service.description}
                      numero={service.numero}
                      style={{backgroundColor:'red'}}
                    />
            )            
             })}
             </Slider>
            </div>
            <div className='carous_container-mobile'>
            <Slider {...settings1}>
            {ServiceData.map((service, id) =>{
            return(
                    <CardService 
                    image={service.image}
                    titre={service.titre}
                    description={service.description}
                    numero={service.numero}
                    style={{backgroundColor:'red'}}
                    />
            )
             })}
             </Slider>
            </div>
            <div className='carous_container-tablette'>
            <Slider {...settings2}>
            {ServiceData.map((service, id) =>{
            return(
                    <CardService 
                    image={service.image}
                    titre={service.titre}
                    description={service.description}
                    numero={service.numero}
                    style={{backgroundColor:'red'}}
                    />
            )
             })}
             </Slider>
            </div>
           
          </div>
          
        </section>

        <section className="section2">
            <div className='aboutAEC' ref={section3Ref}>
              <div className='aboutAEC1'>
              <div className='about1'>
                 <h1 >A propos de nous</h1>
                 <span>Depuis 2003, Audits, Expertises et Contrôles (A.E.C) SARL est une société privée basée à Antananarivo, Madagascar, spécialisée dans le contrôle, l’audit et l’expertise de marchandises, avec une expertise pointue dans les produits pétroliers et leurs dérivés.</span>
                 <span>Forte de plus de deux décennies d'expérience, notre entreprise mobilise une équipe de 50 professionnels qualifiés, répartis entre notre siège et diverses provinces. Nous intervenons directement sur les sites de nos clients pour fournir des prestations sur mesure, en conformité avec les standards internationaux.</span>
                 <span className='about-txt-mobile'>Chez A.E.C, nous sommes fiers de proposer une gamme complète de services adaptés aux besoins spécifiques de nos partenaires, qu’il s’agisse de contrôle de marchandises, de produits pétroliers, ou d’opérations de reboisement. Nos activités s’étendent également à des secteurs clés comme l’agrostologie, la culture de légumes, ainsi que le nettoyage spécialisé (sols et air).</span>
                 <span className='about-txt-mobile'>Notre engagement à respecter des politiques strictes en matière de gestion HSSE (Hygiène, Sécurité, Santé, Environnement) assure la sécurité de nos opérations et la satisfaction de nos clients.</span>
                 {expandedAbout && (
                  <>
                 <span>Chez A.E.C, nous sommes fiers de proposer une gamme complète de services adaptés aux besoins spécifiques de nos partenaires, qu’il s’agisse de contrôle de marchandises, de produits pétroliers, ou d’opérations de reboisement. Nos activités s’étendent également à des secteurs clés comme l’agrostologie, la culture de légumes, ainsi que le nettoyage spécialisé (sols et air).</span>
                 <span>Notre engagement à respecter des politiques strictes en matière de gestion HSSE (Hygiène, Sécurité, Santé, Environnement) assure la sécurité de nos opérations et la satisfaction de nos clients.</span>
                 <span className='voir' onClick={toogleExpanded}>Voir moins ...</span>
                 </>
                 )}
                {!expandedAbout && (
                  <>
                 <span className='voir' onClick={toogleExpanded}>Voir plus ...</span>
                 </>
                 )}

                <div className='btnAbout'> <Link
                                          className='Link1'
                                          to="Section1"
                                          spy={true}
                                          smooth={true}
                                          duration={500} // durée de la transition en millisecondes (ici 0.5 seconde)
                                         >Nos services</Link>
                </div>
              </div>
              <div className='about2'>
                  <div className='imageA' ></div>
              </div>
              </div>
            </div>
        </section>

        <section className="section3">
          <div className="team">
            <div className='team1'>
              <div className='content_titre_team' ref={section4Ref}>
                <div className='ligneteam' >
                    <div className='txtNavteam'>
                      <p>Notre Equipe</p>
                    </div>
                    <div className='traitNavteam'>
                      <img src={ligne} alt='ligne'style={{position:'absolute',maxHeight:'auto', maxWidth:'100%'}}/>
                    </div>
                </div>
              </div>
              <div className='teamParty1'>
                   <CardTeam/>
                   <CardTeam/>
                   <CardTeam/>
              </div>
              <div className='teamParty2'>
                  <CardTeam/>   
             	    <CardTeam/>
                   <CardTeam/>
                   <CardTeam/>
              </div>
            </div>
          </div>
        </section>

        <section className="section4" >
          <div className="lienOffre">
             <div className='lienOffre1'>
                <p>Rejoignez une équipe dynamique et contribuez à des projets innovants. Consultez nos offres d'emploi pour découvrir comment vous pouvez faire la différence !</p>
                <div className='btn_offre_site'> 
                  <NavLink to={"/Emploi/"} className={'linkOffre'}>Nos offres <UilAngleRight size='35px'/></NavLink>
                </div>
             </div>
          </div>
        </section>


        <section className="section5" id='contact' ref={section5Ref} >
            <div className='contactAEC'>
              <div className='containerContact'>
                <div className='content_titre_team' >
                  <div className='ligneteam' >
                      <div className='txtNavteam'>
                        <p>Contact</p>
                      </div>
                      <div className='traitNavteam'>
                        <img src={ligne} alt='ligne'style={{position:'absolute',maxHeight:'auto', maxWidth:'100%'}}/>
                      </div>
                  </div>
                </div>
                <div className='contactAEC1'>
                  <div className='contact1'>
                  <Map latitude={latitude} longitude={longitude} />
                  </div>
                  
                  <div className='contact2'>
                    <div className='inputContact'>
                      {chargement && (
                        <div className='chargement-container1'>
                          <div className="chargement">
                            <Rings color="#36D7B7" />
                          </div>
                        </div>
                      )}
                      <form className='inputContact1' onSubmit={envoyerMessage}>
                            <input
                              type="text"
                              name="name"
                              placeholder="Votre nom"
                              onChange={(e) => setNom(e.target.value)}
                              pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]+" 
                              title="Ce champ ne doit contenir que des lettres et des espaces."
                              value={nom}
                              required
                            />
                            <input
                              type="email"
                              name="email"
                              className={erreur ? 'erreurEmail ' : ''}
                              onChange={selectionEmail}
                              placeholder="Votre e-mail"
                              value={email}
                              required
                            />
                           <InputMask
                            mask="+261 99 99 999 99"
                            value={number}
                            className='telephoneNumber'
                            onChange={selectionNumero}
                            placeholder="Numéro de télephone"
                            required
                          />
                            <textarea
                              name="message"
                              placeholder="Votre message"
                              onChange={(e) => setMessage(e.target.value)}
                              value={message}
                              required
                            />
                            <button type="submit">Envoyer message</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </section>
      <button
      className="ScrollBtn"
      onClick={scrollToTop}
      style={{ display: isVisible ? 'block' : 'none' }}
      >
          <UilArrowUp size="30"/>
      </button>
    </div>
  );
};

export default Site;
