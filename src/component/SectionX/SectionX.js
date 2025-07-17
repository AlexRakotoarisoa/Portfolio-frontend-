import React from 'react'
import { BiSolidPolygon,BiLogoNetlify  } from "react-icons/bi";
import { IoIosRadioButtonOn } from "react-icons/io";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';


const SectionX = () => {
  const { t } = useTranslation();
  return (
    <div id="sx" className='flex items-center justify-between flex-col h-auto w-[100%] bg-[#141C21] pb-[50px] pt-[20px]'>
        <div className='w-[90%]'>
            <div className='text-[22px] text-white audio'>{t('sectionx.grandTitre')}</div>
            <motion.div 
            className='bg-[#00BBFF] h-[3px] w-[150px] mt-[10px] rounded-full'
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "170px", opacity: 1 }}
            transition={{
              duration: 1,
              ease: "easeInOut"
            }}
            viewport={{ once: true }}
            ></motion.div>       
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 ml-[40px] md:ml-0 w-[90%] h-auto mt-[40px] md:mt-[80px]'>

          <div className='flex items-center justify-center'>
            <div className='flex items-center border-l-[1px] w-[500px] md:h-[250px] h-[220px]'>

              <motion.div 
              className='relative w-[100%] h-[80%] px-[20px] md:px-[50px]' 
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{
                  duration: 1.2,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}>
                <div className='absolute left-[-11px] top-0  text-white'>
                  <IoIosRadioButtonOn size={20}/>
                </div>
                <div>
                 <p className='text-[17px] md:text-[20px] text-white'>{t('sectionx.t11')}</p>
                 <p className='md:text-[15px] text-[gray] mt-[12px]'>{t('sectionx.t12')}</p>
                 <p className='md:text-[15px] text-[white] mt-[12px]'>{t('sectionx.t13')}</p>
                <div className='flex gap-3 text-[white]'> 
                  <div className='flex items-center justify-center border-[0.1px] rounded-[10px] w-[90px] py-[3px] border-[yellow] mt-[10px] gap-3'>
                    <p>ReactJS</p>
                  </div>
                  <div className='flex items-center justify-center border rounded-[10px] w-[90px] py-[3px] border-[white] mt-[10px] gap-3'>
                    <p>Django</p>
                  </div>
                  <div className='flex items-center justify-center border rounded-[10px] w-[90px] py-[3px] border-[white] mt-[10px] gap-3'>
                    <p>Figma</p>
                  </div>    
                </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className='flex items-center justify-center'>
            <div className='flex items-center border-l-[1px] w-[500px] h-[250px]'>
              <motion.div 
              className='relative w-[100%] h-[80%] px-[20px] md:px-[50px]' 
              initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{
                  delay: 0.5,
                  duration: 1.2,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}>
              <div className='absolute left-[-11px] top-0  text-white'>
                  <IoIosRadioButtonOn size={20}/>
                </div>
                <div>
                 <p className='text-[17px] md:text-[20px] text-white'>{t('sectionx.t21')}</p>
                 <p className='md:text-[15px] text-[gray] mt-[12px]'>{t('sectionx.t22')}</p>
                 <p className='md:text-[15px] text-[white] mt-[12px]'>{t('sectionx.t23')}</p>
                 <div className='flex gap-3 text-[white]'> 
                  <div className='flex items-center justify-center border rounded-[10px] w-[100px] py-[3px] border-[white] mt-[10px] gap-3'>
                    <p>Java</p>
                  </div>
                </div>
                </div>
              </motion.div>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <div className='flex items-center border-l-[1px] w-[500px] h-[220px] md:h-[250px]'>
              <motion.div 
              className='relative w-[100%] h-[80%] px-[20px] md:px-[50px]' 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
              delay :0.7,
              duration: 1.2,
              ease: "easeOut"
            }}
            viewport={{ once: true }}>
              <div className='absolute left-[-11px] top-0  text-white'>
                  <IoIosRadioButtonOn size={20}/>
                </div>
                <div>
                 <p className='text-[17px] md:text-[20px] text-white'>{t('sectionx.t31')}</p>
                 <p className='md:text-[15px] text-[gray] mt-[12px]'>{t('sectionx.t32')}</p>
                 <p className='md:text-[15px] text-[white] mt-[12px]'>{t('sectionx.t33')}</p>
                 <div className='flex gap-3 text-[white]'> 
                  <div className='flex items-center justify-center border rounded-[10px] w-[100px] py-[3px] border-[white] mt-[10px] gap-3'>
                    <p>Java Script</p>
                  </div>
                  <div className='flex items-center justify-center border rounded-[10px] w-[100px] py-[3px] border-[white] mt-[10px] gap-3'>
                    <p>NodeJS</p>
                  </div>
                </div>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
    </div>
  )
}

export default SectionX
