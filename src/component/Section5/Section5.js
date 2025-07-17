import React from 'react'
import { FaFacebook, FaLinkedin, FaEnvelope, FaPhoneAlt, FaGithub  } from 'react-icons/fa';

import { motion } from "framer-motion";
const Section5 = () => {
  return (

        <div className='flex justify-center flex-col \ items-center text-gray-400   bg-[#141C21] h-[200px] md:h-[160px]'>
                <div className='w-[90%]'>
                          <div className='text-[22px] text-white audio'>CONTACT</div>
                          <motion.div 
                          className='bg-[#00BBFF] h-[3px] w-[150px] mt-[10px] rounded-full'
                          initial={{ width: 0, opacity: 0 }}
                          whileInView={{ width: "100px", opacity: 1 }}
                          transition={{
                            duration: 1,
                            ease: "easeInOut"
                          }}
                          viewport={{ once: true }}
                          ></motion.div>
                        </div>
                <div className='w-[90%] h-[90%]  mt-[30px]'>
                  <div className='flex flex-col gap-2 w-[100%] pl-[25px] '>
                    <div className='flex gap-5'>
                        <a href="mailto:ton.rakotoarisoaalex27@gmail.com">
                            <button className='hover:text-white'>
                              <FaEnvelope size={20} />
                            </button>
                          </a>
                          <p className='text-[15px]'>rakotoarisoaalex27@gmail.com</p>
                      </div>
                      <div className='flex gap-5 '> 
                      <a href="tel:+261344989880">  
                        <button className='hover:text-white'>
                          <FaPhoneAlt data-zoom size={20} />
                        </button >
                      </a>
                      <p className='text-[15px]'>+261 34 49 898 80</p>
                      </div>
                      <div className='flex gap-5'>
                        <a href="https://www.facebook.com/alex.emilien.2025" target="_blank" rel="noopener noreferrer">    
                          <button className='hover:text-white' >
                              <FaFacebook size={22} />
                          </button>
                        </a>
                        <a href="https://mg.linkedin.com/in/alex-rakotoarisoa-705283281" target="_blank" rel="noopener noreferrer">  
                          <button className='hover:text-white'>
                            <FaLinkedin size={22} />
                          </button>
                        </a>
                        <a href="https://github.com/AlexRakotoarisoa" >
                          <button className='hover:text-white'>
                            <FaGithub data-zoom size={22} />
                          </button >
                        </a>
                      </div>
                   
                  </div>
                </div>
    </div>
  )
}

export default Section5
    