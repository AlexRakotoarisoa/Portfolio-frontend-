import React, { useEffect, useRef, useState } from 'react'
import { FaFigma, FaJava, FaJs, FaPython, FaPhp, FaReact } from "react-icons/fa";
import { PiFileCSharp } from "react-icons/pi";
import { BiLogoTypescript, BiLogoPostgresql } from "react-icons/bi";
import { SiDjango, SiTailwindcss, SiMongodb, SiAdobephotoshop, SiAdobeillustrator } from "react-icons/si";
import { TbBrandMysql } from "react-icons/tb";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

const Section4 = () => {
  const orbitRef = useRef(null);
  const [hovered, setHovered] = useState(false);
   const { t } = useTranslation();

  useEffect(() => {
    let angle = 0;
    const radius = 120;
    const interval = setInterval(() => {
      if (!hovered && orbitRef.current) {
        const children = orbitRef.current.children;
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          const theta = angle + (i * (360 / children.length));
          const x = radius * Math.cos((theta * Math.PI) / 180);
          const y = radius * Math.sin((theta * Math.PI) / 180);
          child.style.transform = `translate(${x}px, ${y}px)`;
        }
        angle += 1;
      }
    }, 30);
    return () => clearInterval(interval);
  }, [hovered]);

  const orbitSkills = [
    { name: "JS", icon: <FaJs size={20} /> },
    { name: "React", icon: <FaReact size={20} /> },
    { name: "Python", icon: <FaPython size={20} /> },
    { name: "PHP", icon: <FaPhp size={20} /> },
    { name: "Tailwind", icon: <SiTailwindcss size={20} /> },
    { name: "MongoDB", icon: <SiMongodb size={20} /> },
    { name: "MySQL", icon: <TbBrandMysql size={20} /> },
    { name: "PostgreSQL", icon: <BiLogoPostgresql size={20} /> },
    { name: "Figma", icon: <FaFigma size={20} /> },
    { name: "PS", icon: <SiAdobephotoshop size={20} /> },
    { name: "AI", icon: <SiAdobeillustrator size={20} /> },
  ];

  return (
    <div id="s4">
      {/*Section 4*/}
      <div className='relative text-[white] flex h-auto items-center flex-col bg-[#141C21] w-[100%] md:pt-[80px] pt-[30px] overflow-hidden'>

        <div className='w-[90%]'>
          <div className='text-[22px] text-white audio'>{t('section4.grandTitre')}</div>
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

        {/* Orbit Animation 
        <div
          className="relative w-[300px] h-[300px] mx-auto my-10"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" ref={orbitRef}>
            {orbitSkills.map((skill, i) => (
              <div
                key={i}
                className="absolute w-[60px] h-[60px] flex flex-col items-center justify-center text-white border border-white rounded-full text-xs bg-[#1E2A33] shadow-lg"
              >
                {skill.icon}
                <span className="text-[10px] mt-1">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
*/}

        <div className='flex justify-center md:justify-end w-screen pt-[10px] md:pt-[20px] z-10'>
          <div className='grid grid-cols-1 z-10 w-[90%] md:grid-cols-2 md:w-[80%] md:h-auto p-[40px] pb-[0px] gap-y-10 mb-[50px]'>

            {/* Langages */}
            <div >
              <h1 >{t('section4.competence1')}</h1>
              <div className='flex mt-[30px] gap-4 text-[15px]'>
                <div className='flex items-center justify-center border rounded-[20px] w-[100px] py-[3px] border-[white] mt-[10px] gap-2'>
                  <p>Java</p><FaJava />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[120px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>CSharp</p><PiFileCSharp />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[100px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>PHP</p><FaPhp size={20} />
                </div>
              </div>
              <div className='flex gap-4'>
                <div className='flex items-center justify-center border rounded-[20px] w-[150px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>Java Script</p><FaJs />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[120px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>Python</p><FaPython />
                </div>
              </div>
              <div className='flex items-center justify-center border rounded-[20px] w-[130px] py-[3px] border-[white] mt-[10px] gap-3'>
                <p>TypeScript</p><BiLogoTypescript />
              </div>
            </div>

            {/* Frameworks */}
            <div>
              <h1>{t('section4.competence2')}</h1>
              <div className='flex mt-[30px] gap-4 text-[15px]'>
                <div className='flex items-center justify-center border rounded-[20px] w-[120px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>ReactJS</p><FaReact />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[120px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>Django</p><SiDjango />
                </div>
              </div>
              <div className='flex items-center justify-center border rounded-[20px] w-[150px] py-[3px] border-[white] mt-[10px] gap-3'>
                <p>TailwindCSS</p><SiTailwindcss />
              </div>
            </div>

            {/* Bases de données */}
            <div>
              {t('section4.competence3')}
              <div className='flex mt-[30px] gap-4 text-[15px]'>
                <div className='flex items-center justify-center border rounded-[20px] w-[120px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>MySQL</p><TbBrandMysql />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[150px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>PostgreSQL</p><BiLogoPostgresql />
                </div>
              </div>
              <div className='flex items-center justify-center border rounded-[20px] w-[130px] py-[3px] border-[white] mt-[10px] gap-3'>
                <p>MongoDB</p><SiMongodb />
              </div>
            </div>

            {/* Design */}
            <div >
              {t('section4.competence4')}
              <div className='flex mt-[30px] gap-4 text-[15px]'>
                <div className='flex items-center justify-center border rounded-[20px] w-[180px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>Adobe Photoshop</p><SiAdobephotoshop />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[100px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>Figma</p><FaFigma />
                </div>
              </div>
              <div className='flex items-center justify-center border rounded-[20px] w-[180px] py-[3px] border-[white] mt-[10px] gap-3'>
                <p>Adobe Illustrator</p><SiAdobeillustrator />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Section4
