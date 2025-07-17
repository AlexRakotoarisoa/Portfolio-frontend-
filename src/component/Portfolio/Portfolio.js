import React, { useState, useEffect, useRef } from 'react';
import NavPortfolio from '../NavPortfolio/NavPortfolio';
import Section1 from '../Section1/Section1';
import Section2 from '../Section2/Section2';
import Section3 from '../Section3/Section3';
import Section4 from '../Section4/Section4';
import Section5 from '../Section5/Section5';
import SectionX from '../SectionX/SectionX';
import Section6 from '../Section6/Section6';
import InterfaceImage from '../InterfaceImage/InterfaceImage';
import { useTranslation } from 'react-i18next';
// !!! Supprimez l'import de { Element } de 'react-scroll' car nous n'utilisons plus cette lib pour le scroll !!!
// import { Element } from 'react-scroll';


const Portfolio = () => {
  const { t } = useTranslation();
  const cursorRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const [currentProjectKey, setCurrentProjectKey] = useState(null);

  const section1Ref = useRef(null);
  const section4Ref = useRef(null); // Ref pour Section4
  const sectionXRef = useRef(null); // Ref pour SectionX
  const section3Ref = useRef(null); // Ref pour Section3
  const section5Ref = useRef(null); 

  const scrollToSection = (sectionRef) => {
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: 'smooth', 
        block: 'start',     // Aligne le haut de l'élément avec le haut de la fenêtre visible
      });
    } else {
      console.warn("La référence de la section n'est pas valide ou l'élément n'est pas monté :", sectionRef);
    }
  };


  // Dictionnaire des projets avec leurs images (inchangé)
  const allProjects = {
    projet1: [
      "/images/P11.png",
      "/images/P12.png",
      "/images/P13.png",
      "/images/P14.png",
      "/images/P15.png",
      "/images/P16.png",
      "/images/P17.png",
      "/images/P18.png",
    ],
     projet2: [
      "/images/P21.png",
      "/images/P22.png",
      "/images/P23.png",
      "/images/P24.png",
      "/images/P25.png",
      "/images/P26.png",
      "/images/P27.png",
    ],
     projet3: [
      "/images/P31.png",
      "/images/P32.png",
      "/images/P33.png",
    ],
  };

  // Fonction pour ouvrir la modale avec un projet (inchangé)
  const openProjectModal = (projectKey) => {
    setCurrentProjectKey(projectKey);
    setShowModal(true);
  };

  const [cursorStyle, setCursorStyle] = useState({
    scale: 1,
    color: "bg-white/40",
  });

  // Mouvements du curseur (inchangé)
  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // Effet scale au survol des boutons (inchangé)
  useEffect(() => {
    const buttons = document.querySelectorAll("button");

    const handleMouseEnter = () => {
      setCursorStyle({
        scale: 2,
        color: "bg-white/20",
      });
    };

    const handleMouseLeave = () => {
      setCursorStyle({
        scale: 1,
        color: "bg-white/50",
      });
    };

    buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", handleMouseEnter);
      btn.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener("mouseenter", handleMouseEnter);
        btn.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  // Effet zoom sur les éléments avec data-zoom (inchangé)
  useEffect(() => {
    const zoomTargets = document.querySelectorAll("[data-zoom]");

    const handleZoomEnter = (e) => {
      e.target.classList.add("scale-[1.05]", "transition-transform", "duration-300");
    };

    const handleZoomLeave = (e) => {
      e.target.classList.remove("scale-[1.05]", "transition-transform", "duration-300");
    };

    zoomTargets.forEach((el) => {
      el.addEventListener("mouseenter", handleZoomEnter);
      el.addEventListener("mouseleave", handleZoomLeave);
    });

    return () => {
      zoomTargets.forEach((el) => {
        el.removeEventListener("mouseenter", handleZoomEnter);
        el.removeEventListener("mouseleave", handleZoomLeave);
      });
    };
  }, []);

  return (
    <div className="relative h-screen">
      {/* CURSEUR PERSONNALISÉ (inchangé) */}
      <div
        ref={cursorRef}
        className={`fixed w-8 h-8 rounded-full pointer-events-none z-50 transition-all duration-200 ease-out ${cursorStyle.color}`}
        style={{
          transform: `translate3d(${position.x - 8}px, ${position.y - 8}px, 0) scale(${cursorStyle.scale})`,
        }}
      ></div>

      {/* CONTENU PRINCIPAL */}
      <div className="flex-col bg-[linear-gradient(to_right,#141C21_10%,#103145_80%)] w-screen">
        {/* Passer la fonction scrollToSection et les refs aux props de NavPortfolio */}
        <NavPortfolio
          scrollToSection={scrollToSection}
          section1Ref={section1Ref}
          section4Ref={section4Ref}
          sectionXRef={sectionXRef}
          section3Ref={section3Ref}
          section5Ref={section5Ref}
        />

        <div ref={section1Ref}>
          <Section1 />
        </div>
        <Section2 />
        <div ref={section4Ref}>
          <Section4 />
        </div>
        <div ref={sectionXRef}>
          <SectionX />
        </div>
        <div ref={section3Ref}>
          <Section3 openModal={openProjectModal} />
        </div>
        <div ref={section5Ref}>
            <Section6/>
        </div>
   
        <Section5/>

        <div className="flex items-center justify-center bg-[#141C21] w-full py-[50px]  overflow-hidden">
          <p className="text-md text-center w-[80%] md:w-[100%] text-gray-400 text-[14px]">
            {t('footer.copy')}
          </p>
        </div>
      </div>
       {showModal && currentProjectKey && (
        <InterfaceImage
          images={allProjects[currentProjectKey]}
          onClose={() => {
            setShowModal(false);
            setCurrentProjectKey(null);
          }}
        />
      )}
    </div>
  );
};

export default Portfolio;