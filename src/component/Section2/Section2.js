import React from 'react'
import { motion } from "framer-motion";
import MobileAnimation from '../MobileAnimation';
import { useTranslation } from 'react-i18next';
import { FaCode,FaImage, FaLock } from "react-icons/fa";

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
        <div id="s2" className='flex items-center flex-col bg-[linear-gradient(to_top_right,#141C21_55%,#103145_90%)] w-[100%] h-auto '>
           <div className='w-[90%] mt-[10px] mb-[20px] md:mb-[0px] md:mt-[80px] '>
                              <div className='text-[22px] text-white audio'> {t('section2.grandTitre')}</div>
                              <motion.div className='bg-[#00BBFF] h-[3px] w-[95px] mt-[10px] rounded-full'
                              initial={{ width: 0, opacity: 0 }}
                              whileInView={{ width: "130px", opacity: 1 }}
                              transition={{
                                duration: 1,
                                ease: "easeInOut"
                              }}
                              viewport={{ once: true }}
                              >
                              
                                </motion.div>       
              </div>  
              
              <div className='grid grid-[1fr_1fr_1fr] mt-[10px] h-auto w-[90%]  md:relative md:grid-cols-[1fr_1fr] md:w-[85%] md:mt-[70px] md:gap-[10px]'>
                    <motion.div {...motionProps} className=' p-[20px]  md:border-0  w-[100%] text-white md:p-[40px] bg-gray-600'>
                      <div className='flex gap-4 items-center'>
                        <FaCode className='md:text-[20px]'/>
                        <p className='md:text-[20px]'>{t('section2.titre1')}</p>
                      </div>
                      <p className='text-justify text-[15px] mt-[20px] md:mt-[30px]'>{t('section2.description1')}</p>
                    </motion.div>

                    <motion.div {...motionProps} className='  p-[20px] mt-[10px] md:border-0 md:mt-0 text-white md:p-[40px] bg-gray-600'>
                    <div className='flex gap-4 items-center'>
                      <FaLock className='md:text-[20px]'/>
                      <p className='md:text-[20px]'>{t('section2.titre2')}</p>
                    </div>
                    <p className='text-justify text-[15px] mt-[20px] md:mt-[30px]'>{t('section2.description2')}</p>
                    </motion.div>
                    
                    <motion.div {...motionProps} className='  p-[20px] mt-[10px] md:border-0 md:mt-0 text-white md:p-[40px] bg-gray-600'>
                    <div className='flex gap-4 items-center'>
                      <FaImage className='md:text-[20px]'/>
                      <p className='md:text-[20px]'>{t('section2.titre3')}</p>
                    </div>
                      <p className='text-justify text-[15px] mt-[20px] md:mt-[30px]'>{t('section2.description3')}</p>
                    </motion.div>
                    
              </div> 
        </div> 
  )
}

export default Section2
