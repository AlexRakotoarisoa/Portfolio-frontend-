import React from 'react'
import Cercle from '../../img/Poo.png'
import { FcAddColumn } from "react-icons/fc";
import { FaFacebook, FaLinkedin, FaEnvelope, FaPhoneAlt, FaBars, FaGithub   } from 'react-icons/fa';
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';


const Section1 = () => {
  const { t } = useTranslation();
  const cv = 'images/Alex.pdf';

  return (
      <div className="flex items-center justify-center w-screen h-[100vh]">
          <div className='flex flex-col-reverse items-center md:grid md:items-center md:justify-center md:grid-cols-2 w-[85%] h-[80%] md:mt-[50px] mt-[10px]'>

                <div 
                className='flex flex-col items-center justify-center gap-6 w-[90%] md:w-[100%] h-[100%] md:pl-[30px]'
                
                >
                  <motion.div 
                  className='flex flex-col gap-4 md:w-auto w-[90vw] h-[40vh] md:h-[auto]'
                  initial={{ x: -70, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                  duration: 1.2,
                  ease: "easeOut"
                }}>

                    <div className="flex flex-col">
                        <div className='flex items-center md:items-start flex-col gap-y-0'>
                            <p className='audio text-white text-[8vw] md:text-start md:text-[60px] m-0 p-0'>
                                {t('section1.salutation')}
                            </p>
                          
                            <div className='audio text-white text-center text-[10vw]  md:text-start md:text-[80px] m-0 p-0'>
                                   {t('section1.prenom')}
                            </div>
                        </div>
                    </div>
                    <div className=' text-[4vw] md:text-[20px] text-[#00BBFF] w-[85%] mt-[1vh] md:mt-[16px]'>   
                         {t('section1.titrePoste')}
                    </div>  
                    <div className='relative text-justify'>
                        <p className='text-white text-[4vw] md:text-[15px]'> {t('section1.descriptionPoste')}<a href={cv} download="CV_Rakotoarisoa_Alex.pdf"> <span className='absolute bottom-[-6px] ml-[5px] bg-white text-black px-[10px] text-[14px] py-[5px] rounded-[7px]'>Télécharger CV</span></a> </p>
                        
                    </div>
                    <div>
                      <motion.div 
                      className='flex  items-centerv mt-[30px] justify-between gap-[1px] right-0 w-[190px] h-[50px]'>
                        <a href="https://www.facebook.com/alex.emilien.2025" target="_blank" rel="noopener noreferrer">    
                        <button >
                            <FaFacebook size={30} color='#fff'/>
                        </button>
                        </a>
                        <a href="https://mg.linkedin.com/in/alex-rakotoarisoa-705283281" target="_blank" rel="noopener noreferrer">  
                        <button >
                          <FaLinkedin size={30} color='#fff'/>
                        </button>
                        </a>
                        <a href="mailto:ton.rakotoarisoaalex27@gmail.com">
                        <button>
                          <FaEnvelope size={30} color='#fff'/>
                        </button>
                        </a>
                        <a href="tel:+261344989880" className='md:hidden'>  
                        <button >
                          <FaPhoneAlt data-zoom size={30} color='#fff'/>
                        </button >
                        </a>
                        <a href="https://github.com/AlexRakotoarisoa" className='hidden md:block'>
                        <button >
                          <FaGithub data-zoom size={30} color='#fff'/>
                        </button >
                        </a>
                    </motion.div>
              </div>
              </motion.div>
              </div>
              <motion.div 
              className='relative flex items-center justify-center md:justify-end w-[90vw] h-[40vh] md:w-[100%] md:h-[100%]'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 1,    
                duration: 2,
              }}>
                          <img src={Cercle} alt='Cercle' className="h-[35vh] md:h-[450px]"/>
              </motion.div>
              
            </div>
        </div>
  )
}

export default Section1

{/*className='audio text-[35px] text-center md:mt-[30px] md:text-start md:text-[45px] font-bold p-0 m-0 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent text-gradient-md text-shadow-md'*/}