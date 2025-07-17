import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBars } from 'react-icons/fa';
import AL1 from '../../img/AL1.png';
import AL from '../../img/AL.png';
import { motion, AnimatePresence } from 'framer-motion';

const NavPortfolio = ({ scrollToSection, section1Ref, section4Ref, sectionXRef, section3Ref, section5Ref }) => {
  const { t, i18n } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);

  const switchLang = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <div className='fixed flex items-center z-40 justify-between z-20
      left-1/2 -translate-x-1/2
      mt-[10px] 
      md:mt-0
      rounded-[15px] 
      md:rounded-none
      w-[95%] 
      md:w-full
      h-[55px] 
      md:h-[65px]
      bg-[#fff] 
      md:backdrop-blur-lg
      md:bg-[#141C21]/50
      text-white'>
      

      <div className='hidden md:flex items-center pl-[40px]'>
        <img src={AL} alt='MyLogo' width={35} height={35} />
      </div>

      <div className='md:hidden z-20 flex items-center pl-[20px] md:pl-[40px]'>
        <img src={AL1} alt='MyLogo' width={30} height={30} />
      </div>
       <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "190px", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col text-black pt-5 absolute w-[50%] right-0 z-10 top-[41px] rounded-bl-[20px] rounded-br-[20px] bg-white overflow-hidden"
            >
              {[
                { key: 'nav.nav1', ref: section1Ref },
                { key: 'nav.nav2', ref: section4Ref },
                { key: 'nav.nav3', ref: sectionXRef },
                { key: 'nav.nav4', ref: section3Ref },
                { key: 'nav.nav5', ref: section5Ref }
              ].map((item, index) => (
                <motion.div
                  key={item.key}
                  className="py-1 pl-5 cursor-pointer hover:text-blue-500"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => {
                    scrollToSection(item.ref);
                    setMenuOpen(false); // ferme le menu après clic
                  }}
                >
                  {t(item.key)}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>


      <div className='z-20 flex items-center justify-center gap-2 mr-5 md:hidden'>
         <button
          onClick={switchLang}
          className="border bg-[#141C21] text-white px-3 py-1 rounded-[15px] transition"
        >
          {i18n.language === 'fr' ? 'EN' : 'FR'}
        </button>
        <div className='text-black' style={{ fontSize: "30px" }} onClick={toggleMenu}>
          <FaBars />
        </div>
       </div>

      {/* Menu desktop */}
      <div className='hidden md:flex justify-center items-center gap-5 pr-[40px]'>
          <div
            onClick={() => scrollToSection(section1Ref)}
            className="text-white cursor-pointer hover:text-gray-300 transition-colors duration-200"
          >
            {t('nav.nav1')}
          </div>
          <div
            onClick={() => scrollToSection(section4Ref)}
            className="text-white cursor-pointer hover:text-gray-300 transition-colors duration-200"
          >
            {t('nav.nav2')}
          </div>
          <div
            onClick={() => scrollToSection(sectionXRef)}
            className="text-white cursor-pointer hover:text-gray-300 transition-colors duration-200"
          >
            {t('nav.nav3')}
          </div>
          <div
            onClick={() => scrollToSection(section3Ref)}
            className="text-white cursor-pointer hover:text-gray-300 transition-colors duration-200"
          >
            {t('nav.nav4')}
          </div>
          <div
            onClick={() => scrollToSection(section5Ref)}
            className="text-white cursor-pointer hover:text-gray-300 transition-colors duration-200"
          >
            {t('nav.nav5')}
          </div>
            {/* Bouton langue (inchangé) */}
            <button
              onClick={switchLang}
              className="ml-5 bg-white text-black px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              {i18n.language === 'fr' ? 'EN' : 'FR'}
            </button>
      </div>
    </div>
  );
};

export default NavPortfolio;