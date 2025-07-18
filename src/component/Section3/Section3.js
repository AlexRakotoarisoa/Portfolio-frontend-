import React from 'react'
import Astr from '../../img/Astr.png'
import Afa from '../../img/AFA.png'
import Archange from '../../img/Archange.png'
import Cla from '../../img/Clarissa.png'
import Pr1 from '../../img/Pr1.jpg'
import Pr2 from '../../img/Pr2.jpg'
import Pr3 from '../../img/Pr3.jpg'
import Pr4 from '../../img/Pr4.jpg'

import AL from '../../img/AL.png'
import AL1 from '../../img/AL1.png'
import Ombre from '../../img/Ombre.png'
import { FaFigma, FaJava, FaJs, FaPython, FaPhp, FaReact, FaNodeJs, FaCode, FaImage,FaExternalLinkAlt } from "react-icons/fa";
import { PiFileCSharp } from "react-icons/pi";
import { BiLogoTypescript, BiLogoPostgresql } from "react-icons/bi";
import { SiDjango, SiTailwindcss, SiMongodb, SiAdobephotoshop, SiAdobeillustrator, SiReact } from "react-icons/si";
import { TbBrandMysql } from "react-icons/tb";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

const Section3 = ({ openModal }) => {
      const { t } = useTranslation();
  return (
    <div>
        {/*Section 3*/}
        <div className='flex items-center flex-col bg-[#141C21] w-[100%] h-auto py-[50px] '>
                <div className='w-[90%]'>
                    <div className='text-[22px] text-white audio'> {t('section3.grandTitre')}</div>
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
                <div className='text-[20px] text-white mt-[30px]' >{t('section3.titreProjet')}</div>     
                  <div className='h-auto items-center grid grid-cols-1 md:grid-cols-3 gap-y-[40px] gap-x-[55px] mt-[30px] md:mt-[50px]'>

                      <div className=' h-[auto] w-[350px] rounded-[10px] overflow-hidden'>
                          <div className='relative w-full h-full group overflow-hidden'>
                               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                              <img src={Pr1}/>
                               <button onClick={() => openModal('projet1')} className='absolute flex items-center justify-center gap-2 z-20 bottom-[48px] right-[-100px] w-[100px] h-[25px]  bg-[white] rounded-[10px] text-[14px] group-hover:right-2 transition-all duration-200 ease-in'>Visualiser <FaImage/></button>
                              <button onClick={() => window.open("https://github.com/AlexRakotoarisoa/AEC-frontend", "_blank")} className='absolute flex gap-2 items-center justify-center z-20 bottom-4 right-[-100px] w-[100px] h-[25px]  bg-[white] rounded-[10px] text-[14px] group-hover:right-2 transition-all duration-250 delay-150 ease-in'>Code <FaCode/></button>  
                          </div>
                          <div className=' text-[white] text-[14px] pt-[20px] h-[140px] w-[100%]'> 
                             <p className='font-semibold text-[16px]'>{t('section3.projet1')}</p>
                             <div className='flex gap-3'> 
                                <div className='flex items-center justify-center border-[1.5px] border-[#076584] rounded-[10px] w-[110px] py-[3px] mt-[10px] gap-3'>
                                    <p>ReactJS</p>
                                    <SiReact/>
                                  </div>    
                                <div className='flex items-center justify-center border-[1.5px] border-[#076587]  rounded-[10px] w-[100px] py-[3px] mt-[10px] gap-3'>
                                    <p>Django</p>
                                    <SiDjango/>
                                </div>
                             </div>
                          </div>
                      </div>
                      <div className='h-[auto] w-[350px] rounded-[10px] overflow-hidden'>
                            <div className='relative w-full h-full group overflow-hidden'>
                               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                              <img src={Pr2}/>
                               <button onClick={() => openModal('projet2')} className='absolute flex items-center justify-center gap-2 z-20 bottom-[48px] right-[-100px] w-[100px] h-[25px]  bg-[white] rounded-[10px] text-[14px] group-hover:right-2 transition-all duration-200 ease-in'>Visualiser <FaImage/></button>
                              <button onClick={() => window.open("https://github.com/AlexRakotoarisoa/Code_source_java_stageL2", "_blank")} className='absolute flex gap-2 items-center justify-center z-20 bottom-4 right-[-100px] w-[100px] h-[25px]  bg-[white] rounded-[10px] text-[14px] group-hover:right-2 transition-all duration-250 delay-150 ease-in'>Code <FaCode/></button>  
                          </div>
                          <div className=' text-[white] text-[14px] pt-[20px] h-[140px] w-[100%]'> 
                             <p className='font-semibold text-[16px]'>{t('section3.projet2')}</p>
                             <div className='flex gap-3'> 
                                <div className='flex items-center justify-center border-[#076766] rounded-[10px] w-[100px] py-[3px] border-[1.5px] mt-[10px] gap-3'>
                                    <p>Java SE</p>
                                    <FaJava/>
                                  </div>    
                             </div>
                          </div>
                      </div>
                      <div className='h-[auto] w-[350px] rounded-[10px] overflow-hidden'>
                           <div className='relative w-full h-full group overflow-hidden'>
                               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                              <img src={Pr3}/>
                              <button onClick={() => openModal('projet3')} className='absolute flex items-center justify-center gap-2 z-20 bottom-[48px] right-[-100px] w-[100px] h-[25px]  bg-[white] rounded-[10px] text-[14px] group-hover:right-2 transition-all duration-200 ease-in'>Visualiser <FaImage/></button>
                              <button onClick={() => window.open("https://github.com/AlexRakotoarisoa/Gestion_etudiant_nodeJS", "_blank")} className='absolute flex gap-2 items-center justify-center z-20 bottom-4 right-[-100px] w-[100px] h-[25px]  bg-[white] rounded-[10px] text-[14px] group-hover:right-2 transition-all duration-250 delay-150 ease-in'>Code <FaCode/></button>  
                          </div>
                          <div className=' text-[white] text-[14px] pt-[20px] h-[140px] w-[100%]'> 
                             <p className='font-semibold text-[16px]'>{t('section3.projet3')}</p>
                             <div className='flex gap-3'> 
                                <div className='flex items-center justify-center border border-[#4C4B4B]  rounded-[10px] w-[140px] py-[3px] border-[white] mt-[10px] gap-3'>
                                    <p>Java Script</p>
                                    <FaJs/>
                                  </div>    
                                  <div className='flex items-center justify-center border border-[#4C4B4B] rounded-[10px] w-[100px] py-[3px] border-[white] mt-[10px] gap-3'>
                                    <p>NodeJS</p>
                                    <FaNodeJs/>
                                  </div>    
                             </div>
                          </div>
                      </div>
                    <div className='h-[auto] w-[350px] rounded-[10px] overflow-hidden'>
                           <div className='relative w-full h-full group overflow-hidden'>
                               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                              <img src={Pr4}/>
                              <button onClick={() => window.open("https://github.com/AlexRakotoarisoa/Portfolio-frontend-", "_blank")} className='absolute flex gap-2 items-center justify-center z-20 bottom-4 right-[-100px] w-[100px] h-[25px]  bg-[white] rounded-[10px] text-[14px] group-hover:right-2 transition-all duration-250 delay-150 ease-in'>Code <FaCode/></button>  
                          </div>
                          <div className=' text-[white] text-[14px] pt-[20px] h-[140px] w-[100%]'> 
                             <p className='font-semibold text-[16px]'>{t('section3.projet4')}</p>
                             <div className='flex gap-3'> 
                                <div className='flex items-center justify-center border border-[#4C4B4B]  rounded-[10px] w-[100px] py-[3px] border-[white] mt-[10px] gap-3'>
                                    <p>ReactJS</p>
                                    <FaReact/>
                                  </div>    
                                  <div className='flex items-center justify-center border border-[#4C4B4B] rounded-[10px] w-[140px] py-[3px] border-[white] mt-[10px] gap-3'>
                                    <p>TailwindCSS</p>
                                    <SiTailwindcss/>
                                  </div>    
                                  <div className='flex items-center justify-center border border-[#4C4B4B] rounded-[10px] w-[100px] py-[3px] border-[white] mt-[10px] gap-3'>
                                    <p>Figma</p>
                                    <FaFigma/>
                                  </div>    
                             </div>
                          </div>
                      </div>
                  </div>
                <div className='text-[20px] text-white mt-[50px]' >{t('section3.titreLogo')}</div>
                <div className='h-auto items-center grid grid-cols-2 gap-x-[30px] md:grid-cols-4 gap-y-10 md:gap-x-[55px] mt-[60px]'>
                      <div className='relative w-[100%] group  overflow-y-scroll h-[170px] md:h-[100%] flex md:items-center md:justify-center md:overflow-hidden'>
                        <div className='absolute flex flex-col items-center right-[300px] rounded-tr-[20px] rounded-br-[20px] opacity-0 group-hover:opacity-100 group-hover:right-0 transition-all duration-700 justify-center w-[100%] h-auto md:h-[100%]  bg-[#1D262B] z-20 p-[10px] md:p-[20px]'>
                            <div className='text-[12px] text-white text-justify'>{t('section3.logo1')}</div>
                            <div className='w-[50px] rounded-full h-[2px] mt-5 bg-white'></div>
                        </div>
                        <div className='absolute w-[100%] flex justify-center bottom-0 z-10'>
                               <img src={Ombre} className='w-[75%] '/>
                            </div>
                        <div className='h-[160px] w-[160px] md:h-[250px] md:w-[250px] rounded-[10px] overflow-hidden'>
                            <div className='flex items-center justify-center  w-[100%] h-[100%]'>
                                <img src={Archange} className='w-[150px] md:w-[220px] md:h-[220px]'/>
                            </div>
                        </div>
                      </div>

                        <div className='relative w-[100%] group  overflow-y-scroll h-[170px] md:h-[100%] flex md:items-center md:justify-center md:overflow-hidden'>
                        <div className='absolute flex flex-col items-center right-[300px] rounded-tr-[20px] rounded-br-[20px] opacity-0 group-hover:opacity-100 group-hover:right-0 transition-all duration-700 justify-center w-[100%] h-auto md:h-[100%]  bg-[#1D262B] z-20 p-[10px] md:p-[20px]'>
                            <div className='text-[12px] text-white text-justify'>{t('section3.logo2')}</div>
                            <div className='w-[50px] rounded-full h-[2px] mt-5 bg-white'></div>
                        </div>
                        <div className='absolute bottom-0 flex justify-center z-10'>
                               <img src={Ombre} className='w-[75%]'/>
                            </div>
                        <div className='h-[160px] w-[160px] md:h-[250px] md:w-[250px] rounded-[10px] overflow-hidden'>
                            <div className='flex items-center justify-center  w-[100%] h-[100%]'>
                                <img src={Afa} className='w-[150px] md:w-[220px] md:h-[220px]'/>
                            </div>
                        </div>
                      </div>

                       <div className='relative w-[100%] group  overflow-y-scroll  h-[170px] md:h-[100%] flex md:items-center md:justify-center md:overflow-hidden'>
                        <div className='absolute flex flex-col items-center right-[300px] rounded-tr-[20px] rounded-br-[20px] opacity-0 group-hover:opacity-100 group-hover:right-0 transition-all duration-700 justify-center w-[100%] h-auto md:h-[100%]  bg-[#1D262B] z-20 p-[10px] md:p-[20px]'>
                            <div className='text-[12px] text-white text-justify'>{t('section3.logo3')}</div>
                            <div className='w-[50px] rounded-full h-[2px] mt-5 bg-white'></div>
                        </div>
                        <div className='absolute bottom-0 flex justify-center z-10'>
                               <img src={Ombre} className='w-[75%]'/>
                            </div>
                        <div className='h-[160px] w-[160px] md:h-[250px] md:w-[250px] rounded-[10px] overflow-hidden'>
                            <div className='flex items-center  justify-center  w-[100%] h-[100%]'>
                                <img src={Astr} className='w-[150px] md:w-[220px] md:h-[220px]'/>
                            </div>
                        </div>
                      </div>

                      <div className='relative w-[100%] group  overflow-y-scroll  h-[170px] md:h-[100%] flex md:items-center md:justify-center md:overflow-hidden'>
                        <div className='absolute flex flex-col items-center right-[300px] rounded-tr-[20px] rounded-br-[20px] opacity-0 group-hover:opacity-100 opacity-0 group-hover:opacity-100 group-hover:right-0 transition-all duration-700 justify-center w-[100%] h-auto md:h-[100%]  bg-[#1D262B] z-20 p-[10px] md:p-[20px]'>
                            <div className='text-[12px] text-white text-justify'>{t('section3.logo4')}</div>
                            <div className='w-[50px] rounded-full h-[2px] mt-5 bg-white'></div>
                        </div>
                        <div className='absolute bottom-0 flex justify-center z-10'>
                               <img src={Ombre} className='w-[75%]'/>
                            </div>
                        <div className='h-[160px] w-[160px] md:h-[250px] md:w-[250px] rounded-[10px] overflow-hidden'>
                            <div className='flex items-center justify-center  w-[100%] h-[100%]'>
                                <img src={Cla} className='w-[150px] md:w-[220px] md:h-[220px]'/>
                            </div>
                        </div>
                      </div>
                        <div className='relative w-[100%] group  overflow-y-scroll h-[170px] md:h-[100%] flex md:items-center md:justify-center md:overflow-hidden'>
                        <div className='absolute flex flex-col items-center right-[300px] rounded-tr-[20px] rounded-br-[20px] opacity-0 group-hover:opacity-100 group-hover:right-0 transition-all duration-700 justify-center w-[100%] h-auto md:h-[100%]  bg-[#1D262B] z-20 p-[10px] md:p-[20px]'>
                            <div className='text-[12px] text-white text-justify'>{t('section3.logo5')}</div>
                            <div className='w-[50px] rounded-full h-[2px] mt-5 bg-white'></div>
                        </div>
                        <div className='h-[160px] w-[160px] md:h-[250px] md:w-[250px] rounded-[10px] overflow-hidden'>
                            <div className='flex items-center justify-center  w-[100%] h-[100%]'>
                                <img src={AL} className='w-[120px] md:w-[190px] md:h-[190px]'/>
                            </div>
                        </div>
                      </div>
                      
                  </div> 
        </div>
    </div>
  )
}

export default Section3