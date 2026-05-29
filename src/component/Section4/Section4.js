import React, { useEffect, useRef, useState } from 'react'
import { FaFigma, FaJava, FaJs, FaPython, FaPhp, FaReact, FaShieldAlt, FaServer, FaNetworkWired, FaKey, FaNodeJs } from "react-icons/fa";
import { PiFileCSharp } from "react-icons/pi";
import { BiLogoTypescript, BiLogoPostgresql, BiNetworkChart } from "react-icons/bi";
import { SiDjango, SiTailwindcss, SiMongodb, SiAdobephotoshop, SiAdobeillustrator, SiDocker, SiGit } from "react-icons/si";
import { FiKey } from "react-icons/fi";
import { TbBrandMysql } from "react-icons/tb";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

const Section4 = () => {
  const orbitRef = useRef(null);
  const hovered = useState(false);
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

  return (
    <div id="s4">
      {/*Section 4*/}
      <div className='relative text-[white] flex h-auto items-center flex-col pt-[90px] bg-[#141C21] w-[100%] md:pt-[80px] pt-[30px] overflow-hidden'>

        <div className='w-[90%]'>
          <div className='text-[22px] text-white audio'>{t('section4.grandTitre')}</div>
          <motion.div
            className='bg-[#00BBFF] h-[3px] w-[150px] mt-[10px] rounded-full'
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "100px", opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: true }}
          />
        </div>

        <div className='flex justify-center md:justify-center w-screen pt-[0px] md:pt-[20px] z-10'>
          <div className='grid grid-cols-1 z-10 w-[100%] md:grid-cols-2 md:w-[90%] md:h-auto p-[40px] pb-[0px] gap-10 mb-[50px]'>

            {/* Langages */}
            <div>
              <h1>{t('section4.competence1')}</h1>
              <div className='flex mt-[20px] gap-4 text-[15px]'>
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
              <div className='flex mt-[20px] gap-4 text-[15px]'>
                <div className='flex items-center justify-center border rounded-[20px] w-[120px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>ReactJS</p><FaReact />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[120px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>Django</p><SiDjango />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[120px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>NodeJS</p><FaNodeJs />
                </div>
              </div>
              <div className='flex items-center justify-center border rounded-[20px] w-[150px] py-[3px] border-[white] mt-[10px] gap-3'>
                <p>TailwindCSS</p><SiTailwindcss />
              </div>
            </div>

            {/* Bases de données */}
            <div>
              {t('section4.competence3')}
              <div className='flex mt-[20px] gap-4 text-[15px]'>
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

            {/* DevOps & Outils */}
              <div>
                {t('section4.competence6')}
                <div className='flex mt-[20px] gap-4 text-[15px]'>
                  <div className='flex items-center justify-center border rounded-[20px] w-[120px] py-[3px] border-[white] mt-[10px] gap-3'>
                    <p>Docker</p><SiDocker />
                  </div>
                  <div className='flex items-center justify-center border rounded-[20px] w-[100px] py-[3px] border-[white] mt-[10px] gap-3'>
                    <p>Git</p><SiGit />
                  </div>
                </div>
              </div>

            {/* Design */}
            <div>
              {t('section4.competence4')}
              <div className='flex mt-[20px] gap-4 text-[15px]'>
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

            {/* Cybersécurité & Réseaux */}
            <div>
              {t('section4.competence5')}
              <div className='flex flex-wrap mt-[20px] gap-x-4 text-[15px]'>
                <div className='flex items-center justify-center border rounded-[20px] w-[150px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>Suricata</p><FaShieldAlt />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[120px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>ELK Stack</p><FaServer />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[120px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>IDS / IPS</p><FaShieldAlt />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[120px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>Pare-feu</p><FaNetworkWired />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[100px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>VPN</p><FaKey />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[150px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>Auth & Authz</p><FiKey />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[180px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>TCP/IP, DNS, DHCP</p><BiNetworkChart />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[130px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>Kali Linux</p><FaShieldAlt />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[110px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>iptables</p><FaNetworkWired />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[120px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>Wireshark</p><BiNetworkChart />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[100px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>Nmap</p><FaNetworkWired />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[120px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>Sliver C2</p><FaShieldAlt />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[120px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>Mimikatz</p><FiKey />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[170px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>Active Directory</p><FaServer />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[110px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>TheHive</p><FaShieldAlt />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[110px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>Netcat</p><BiNetworkChart />
                </div>
                <div className='flex items-center justify-center border rounded-[20px] w-[130px] py-[3px] border-[white] mt-[10px] gap-3'>
                  <p>PowerShell</p><FaServer />
                </div>
              </div>
            </div>

            <div></div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Section4