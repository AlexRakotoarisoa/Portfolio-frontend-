import React from 'react'
import { motion } from "framer-motion";
import MobileAnimation from '../MobileAnimation';
import { useTranslation } from 'react-i18next';

const Section2 = () => {
  const { t } = useTranslation();

  const isMobile = MobileAnimation(); // ✅ détecte si l'écran est petit

  const motionProps = isMobile
    ? {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" },
        viewport: { once: true, amount: 0.3 },
      }
    : {};

  return (
        <div id="s2" className='flex items-center flex-col bg-[linear-gradient(to_top_right,#141C21_55%,#103145_90%)] w-[100%] h-auto  '>
          <div className='w-[80%] text-center  text-[25px] md:text-[30px] text-[#00BBFF] mt-[10px] md:mt-[80px] audio1'>{t('section2.grandTitre')}</div>       
              <div className='grid grid-[1fr_1fr_1fr] mt-[10px] h-auto bg-transparent w-[100%] rounded-[10px] md:relative md:grid-cols-[1fr_1fr_1fr] md:w-[85%] md:bg-[#1D262B] md:h-[250px] md:mt-[70px] shadow-2xl p-[30px]'>
                    <motion.div {...motionProps} className='border-2 border-[gray] md:border-0 rounded-[10px] w-[100%] text-white p-[20px]'>
                      <h4>{t('section2.titre1')}</h4>
                      <p className='text-justify text-[15px] mt-[20px] md:mt-[40px]'>{t('section2.description1')}</p>
                    </motion.div>
                    <motion.div {...motionProps} className='border-2 border-[gray] rounded-[10px] mt-[20px] md:border-0 md:mt-0 text-white p-[20px]'>
                    <h4>{t('section2.titre2')}</h4>
                    <p className='text-justify text-[15px] mt-[20px] md:mt-[40px]'>{t('section2.description2')}</p>
                    </motion.div>
                    <motion.div {...motionProps} className='border-2 border-[gray] rounded-[10px] mt-[20px] md:border-0 md:mt-0 text-white p-[20px]'>
                      <h4>{t('section2.titre3')}</h4>
                      <p className='text-justify text-[15px] mt-[20px] md:mt-[40px]'>{t('section2.description3')}</p>
                    </motion.div>
              </div> 
        </div> 
  )
}

export default Section2
