import React, { useState } from 'react'
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { FaEye, FaTimes } from 'react-icons/fa'; // icônes ajoutées
import Certificat1 from '../../img/Certificat1.jpg'
import Certificat2 from '../../img/Certificat2.jpg'

const Section6 = () => {
  const { t } = useTranslation();
  const [selectedCertif, setSelectedCertif] = useState(null); // état pour choisir le certificat

  return (
    <div id="s6" className='flex items-center flex-col bg-[#141C21] w-[100%] '>

      {/* MODAL certificat */}
      {selectedCertif && (
        <div className='  flex items-center justify-center inset-0 z-50 bg-black/50 backdrop-blur-lg fixed'>
            <img
              src={selectedCertif === 'c1' ? Certificat1 : Certificat2}
              className='w-[95vw] md:w-[60vw] relative rounded-[3px]'
            />
            <button
              onClick={() => setSelectedCertif(null)}
              className="absolute top-2 right-2 text-white bg-black/70 p-2 rounded-full"
            >
              <FaTimes />
            </button>
          </div>
      )}

      <div className='w-[90%] h-[250px] md:h-[190px] rounded-[20px]'>
        <div className='text-[22px] text-white audio'>{t('section6.grandTitre')}</div>
        <motion.div 
          className='bg-[#00BBFF] h-[3px] w-[150px] mt-[10px] rounded-full'
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "150px", opacity: 1 }}
          transition={{
            duration: 1,
            ease: "easeInOut"
          }}
          viewport={{ once: true }}
        ></motion.div>

        <div className='w-[100%] items-center justify-center flex mt-[40px]'>
          <div className='flex flex-col gap-4 text-white text-[14px] w-[90%]'>

    
            <div className='flex gap-5 items-center'>
              <p>{t('section6.c2')}</p>
              <button onClick={() => setSelectedCertif('c1')}>
                <FaEye size={20} className='text-white hover:text-[#00BBFF]' />
              </button>
            </div>
             <div className='flex gap-5 items-center'>
              <p>{t('section6.c1')}</p>
              <button onClick={() => setSelectedCertif('c2')}>
                <FaEye size={20} className='text-white hover:text-[#00BBFF]' />
              </button>
            </div>

          </div>
        </div> 
      </div>
    </div>
  )
}

export default Section6
