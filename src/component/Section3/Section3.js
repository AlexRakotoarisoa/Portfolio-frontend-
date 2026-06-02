import React from 'react'
import Astr from '../../img/Astr.png'
import Afa from '../../img/AFA.png'
import Archange from '../../img/Archange.png'
import Cla from '../../img/Clarissa.png'
import Pr1 from '../../img/Pr1.jpg'
import Pr2 from '../../img/Pr2.jpg'
import Pr3 from '../../img/Pr3.jpg'
import Pr4 from '../../img/Pr4.jpg'
import Pr5 from '../../img/Pr5.png'

import AL from '../../img/AL.png'
import Ombre from '../../img/Ombre.png'
import { FaFigma, FaJava, FaJs, FaReact, FaNodeJs, FaCode, FaImage, FaShieldAlt, FaFileAlt, FaNetworkWired, FaLock } from "react-icons/fa";
import { SiDjango, SiTailwindcss, SiReact } from "react-icons/si";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

const CyberCard = ({ icon, title, badge, badgeColor, description, tags, actionLabel, actionIcon, onAction }) => (
  <div className='h-auto w-[350px] rounded-[10px] overflow-hidden border border-[#1E3A4A] bg-[#0D1B22]'>
    <div className='relative w-full group overflow-hidden'>
      {/* Banner visuelle */}
      <div className='w-full h-[180px] flex items-center justify-center bg-gradient-to-br from-[#0A2A3A] to-[#112233]'>
        <div className='flex flex-col items-center gap-3'>
          <div className='text-[#00BBFF] text-[48px]'>{icon}</div>
          <span className={`text-[11px] px-3 py-1 rounded-full font-semibold ${badgeColor}`}>
            {badge}
          </span>
        </div>
      </div>
      {/* Action button */}
      <button
        onClick={onAction}
        className='absolute flex items-center justify-center gap-2 z-20 bottom-4 right-[-160px] w-[130px] h-[25px] bg-white rounded-[10px] text-[13px] group-hover:right-2 transition-all duration-200 ease-in'
      >
        {actionLabel} {actionIcon}
      </button>
    </div>

    <div className='text-white text-[14px] pt-[20px] px-[10px] pb-[20px] w-full'>
      <p className='font-semibold text-[15px] mb-2'>{title}</p>
      <p className='text-gray-400 text-[12px] leading-5 mb-3'>{description}</p>
      <div className='flex flex-wrap gap-2'>
        {tags.map((tag, i) => (
          <div key={i} className='flex items-center justify-center border border-[#076584] rounded-[10px] px-3 py-[3px] gap-2 text-[12px]'>
            {tag.label} {tag.icon}
          </div>
        ))}
      </div>
    </div>
  </div>
)

const Section3 = ({ openModal }) => {
  const { t } = useTranslation();

  return (
    <div>
      {/*Section 3*/}
      <div className='flex items-center flex-col bg-[#141C21] w-[100%] h-auto py-[50px]'>
        <div className='w-[90%]'>
          <div className='text-[22px] text-white audio'>{t('section3.grandTitre')}</div>
          <motion.div
            className='bg-[#00BBFF] h-[3px] w-[95px] mt-[10px] rounded-full'
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "130px", opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: true }}
          />
        </div>

         {/* ── Séparateur Cybersécurité ── */}
        <div className='w-[90%] mt-[60px] mb-[10px]'>
          <motion.div
            className='bg-[#00BBFF] h-[1px] w-full opacity-20'
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            viewport={{ once: true }}
          />
        </div>

        <div className='text-[20px] text-white mt-[30px]'>MES PROJETS CYBERSÉCURITÉ</div>
        <p className='text-gray-500 text-[13px] mt-[8px] mb-[10px]'>Réalisés en environnement contrôlé — rapports & code disponibles</p>

        <div className='h-auto items-start grid grid-cols-1 md:grid-cols-3 gap-y-[40px] gap-x-[55px] mt-[30px] md:mt-[40px]'>
        
        
      {/* Carte 1 — Reverse Shell */}
        <CyberCard
        icon={<FaShieldAlt />}
        title={t('section3.cyber1Titre')}
        badge={t('section3.cyber1Badge')}
        badgeColor="bg-[#1A3320] text-[#4ADE80] border border-[#4ADE80]/30"
        description={t('section3.cyber1Description')}
        tags={[
            { label: "PowerShell", icon: null },
            { label: "Netcat", icon: null },
            { label: "Kali Linux", icon: null },
            { label: "UDP", icon: null },
            { label: "Windows Security", icon: null },
        ]}
        actionLabel={t('section3.cyber1Action')}
        actionIcon={<FaFileAlt />}
        onAction={() => window.open('/rapport-reverse-shell.pdf', '_blank')}
        />

        {/* Carte 2 — LAB SOC & Architecture Cyber */}
        <CyberCard
        icon={<FaNetworkWired />}
        title={t('section3.cyber2Titre')}
        badge={t('section3.cyber2Badge')}
        badgeColor="bg-[#1e1b4b] text-[#818cf8] border border-[#818cf8]/30"
        description={t('section3.cyber2Description')}
        tags={[
            { label: "Sliver C2 / Mimikatz", icon: null },
            { label: "Suricata (IDS/IPS)", icon: null },
            { label: "Elasticsearch & Kibana", icon: null },
            { label: "TheHive & Filebeat", icon: null },
            { label: "Linux Netplan & iptables", icon: null },
            { label: "Active Directory", icon: null },
        ]}
        actionLabel={t('section3.cyber2Action')}
        actionIcon={<FaFileAlt />}
        onAction={() => window.open('/guide-soc-lab.pdf', '_blank')}
        />

        {/* Carte 3 — Firewall iptables */}
        <CyberCard
        icon={<FaNetworkWired />}
        title={t('section3.cyber3Titre')}
        badge={t('section3.cyber3Badge')}
        badgeColor="bg-[#2A1A0A] text-[#FB923C] border border-[#FB923C]/30"
        description={t('section3.cyber3Description')}
        tags={[
            { label: "Python (Tkinter)", icon: null },
            { label: "iptables", icon: null },
            { label: "Subprocess", icon: null },
            { label: "RegEx (Validation)", icon: null },
            { label: "Linux Security", icon: null },
        ]}
        actionLabel={t('section3.cyber3Action')}
        actionIcon={<FaCode />}
        onAction={() => window.open('https://github.com/AlexRakotoarisoa/Projet_reseau/blob/master/bb_firewall2.py', '_blank')}
        />
      {/* Carte 4 — Cryptographie */}
        <CyberCard
        icon={<FaLock />}
        title={t('section3.cyber4Titre')}
        badge={t('section3.cyber4Badge')}
        badgeColor="bg-[#1A0A2A] text-[#C084FC] border border-[#C084FC]/30"
        description={t('section3.cyber4Description')}
        tags={[
            { label: "AES", icon: null },
            { label: "RSA", icon: null },
            { label: "Python", icon: null },
        ]}
        actionLabel={null}
        actionIcon={null}
        onAction={null}
        />
        </div>

        {/* ── Projets Dev ── */}
        <div className='text-[20px] text-white mt-[30px]'>{t('section3.titreProjet')}</div>
        <div className='h-auto items-center grid grid-cols-1 md:grid-cols-3 gap-y-[40px] gap-x-[55px] mt-[30px] md:mt-[50px]'>

          <div className='h-[auto] w-[350px] rounded-[10px] overflow-hidden'>
            <div className='relative w-full h-full group overflow-hidden'>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
              <img src={Pr1} alt='Site AEC'/>
              <button onClick={() => openModal('projet1')} className='absolute flex items-center justify-center gap-2 z-20 bottom-[48px] right-[-100px] w-[100px] h-[25px] bg-[white] rounded-[10px] text-[14px] group-hover:right-2 transition-all duration-200 ease-in'>Visualiser <FaImage/></button>
              <button onClick={() => window.open("https://github.com/AlexRakotoarisoa/AEC-frontend", "_blank")} className='absolute flex gap-2 items-center justify-center z-20 bottom-4 right-[-100px] w-[100px] h-[25px] bg-[white] rounded-[10px] text-[14px] group-hover:right-2 transition-all duration-250 delay-150 ease-in'>Code <FaCode/></button>
            </div>
            <div className='text-[white] text-[14px] pt-[20px] h-[140px] w-[100%]'>
              <p className='font-semibold text-[16px]'>{t('section3.projet1')}</p>
              <div className='flex gap-3'>
                <div className='flex items-center justify-center border-[1.5px] border-[#076584] rounded-[10px] w-[110px] py-[3px] mt-[10px] gap-3'><p>ReactJS</p><SiReact/></div>
                <div className='flex items-center justify-center border-[1.5px] border-[#076587] rounded-[10px] w-[100px] py-[3px] mt-[10px] gap-3'><p>Django</p><SiDjango/></div>
              </div>
            </div>
          </div>

          <div className='h-[auto] w-[350px] rounded-[10px] overflow-hidden'>
            <div className='relative w-full h-full group overflow-hidden'>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
              <img src={Pr2} alt='Application DRAE'/>
              <button onClick={() => openModal('projet2')} className='absolute flex items-center justify-center gap-2 z-20 bottom-[48px] right-[-100px] w-[100px] h-[25px] bg-[white] rounded-[10px] text-[14px] group-hover:right-2 transition-all duration-200 ease-in'>Visualiser <FaImage/></button>
              <button onClick={() => window.open("https://github.com/AlexRakotoarisoa/Code_source_java_stageL2", "_blank")} className='absolute flex gap-2 items-center justify-center z-20 bottom-4 right-[-100px] w-[100px] h-[25px] bg-[white] rounded-[10px] text-[14px] group-hover:right-2 transition-all duration-250 delay-150 ease-in'>Code <FaCode/></button>
            </div>
            <div className='text-[white] text-[14px] pt-[20px] h-[140px] w-[100%]'>
              <p className='font-semibold text-[16px]'>{t('section3.projet2')}</p>
              <div className='flex gap-3'>
                <div className='flex items-center justify-center border-[#076766] rounded-[10px] w-[100px] py-[3px] border-[1.5px] mt-[10px] gap-3'><p>Java SE</p><FaJava/></div>
              </div>
            </div>
          </div>

          <div className='h-[auto] w-[350px] rounded-[10px] overflow-hidden'>
            <div className='relative w-full h-full group overflow-hidden'>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
              <img src={Pr3} alt='Plateforme Etudiant'/>
              <button onClick={() => openModal('projet3')} className='absolute flex items-center justify-center gap-2 z-20 bottom-[48px] right-[-100px] w-[100px] h-[25px] bg-[white] rounded-[10px] text-[14px] group-hover:right-2 transition-all duration-200 ease-in'>Visualiser <FaImage/></button>
              <button onClick={() => window.open("https://github.com/AlexRakotoarisoa/Gestion_etudiant_nodeJS", "_blank")} className='absolute flex gap-2 items-center justify-center z-20 bottom-4 right-[-100px] w-[100px] h-[25px] bg-[white] rounded-[10px] text-[14px] group-hover:right-2 transition-all duration-250 delay-150 ease-in'>Code <FaCode/></button>
            </div>
            <div className='text-[white] text-[14px] pt-[20px] h-[140px] w-[100%]'>
              <p className='font-semibold text-[16px]'>{t('section3.projet3')}</p>
              <div className='flex gap-3'>
                <div className='flex items-center justify-center border border-[#4C4B4B] rounded-[10px] w-[140px] py-[3px] border-[white] mt-[10px] gap-3'><p>Java Script</p><FaJs/></div>
                <div className='flex items-center justify-center border border-[#4C4B4B] rounded-[10px] w-[100px] py-[3px] border-[white] mt-[10px] gap-3'><p>NodeJS</p><FaNodeJs/></div>
              </div>
            </div>
          </div>

          <div className='h-[auto] w-[350px] rounded-[10px] overflow-hidden'>
            <div className='relative w-full h-full group overflow-hidden'>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
              <img src={Pr4} alt='Portfolio'/>
              <button onClick={() => window.open("https://github.com/AlexRakotoarisoa/Portfolio-frontend-", "_blank")} className='absolute flex gap-2 items-center justify-center z-20 bottom-4 right-[-100px] w-[100px] h-[25px] bg-[white] rounded-[10px] text-[14px] group-hover:right-2 transition-all duration-250 delay-150 ease-in'>Code <FaCode/></button>
            </div>
            <div className='text-[white] text-[14px] pt-[20px] h-[140px] w-[100%]'>
              <p className='font-semibold text-[16px]'>{t('section3.projet4')}</p>
              <div className='flex gap-3'>
                <div className='flex items-center justify-center border border-[#4C4B4B] rounded-[10px] w-[100px] py-[3px] border-[white] mt-[10px] gap-3'><p>ReactJS</p><FaReact/></div>
                <div className='flex items-center justify-center border border-[#4C4B4B] rounded-[10px] w-[140px] py-[3px] border-[white] mt-[10px] gap-3'><p>TailwindCSS</p><SiTailwindcss/></div>
                <div className='flex items-center justify-center border border-[#4C4B4B] rounded-[10px] w-[100px] py-[3px] border-[white] mt-[10px] gap-3'><p>Figma</p><FaFigma/></div>
              </div>
            </div>
          </div>

          <div className='h-[auto] w-[350px] rounded-[10px] overflow-hidden'>
            <div className='relative w-full h-full group overflow-hidden'>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
              <img src={Pr5} alt='Application Chorale'/>
              <button onClick={() => openModal('projet5')} className='absolute flex items-center justify-center gap-2 z-20 bottom-[48px] right-[-100px] w-[100px] h-[25px] bg-[white] rounded-[10px] text-[14px] group-hover:right-2 transition-all duration-200 ease-in'>Visualiser <FaImage/></button>
              <button onClick={() => window.open("https://github.com/AlexRakotoarisoa/chorale_app", "_blank")} className='absolute flex gap-2 items-center justify-center z-20 bottom-4 right-[-100px] w-[100px] h-[25px] bg-[white] rounded-[10px] text-[14px] group-hover:right-2 transition-all duration-250 delay-150 ease-in'>Code <FaCode/></button>
            </div>
            <div className='text-[white] text-[14px] pt-[20px] h-[140px] w-[100%]'>
              <p className='font-semibold text-[16px]'>{t('section3.projet5')}</p>
              <div className='flex gap-3'>
                <div className='flex items-center justify-center border-[#076766] rounded-[10px] w-[100px] py-[3px] border-[1.5px] mt-[10px] gap-3'><p>Java</p><FaJava/></div>
              </div>
            </div>
          </div>

        </div>

       

        {/* ── Logos ── */}
        <div className='text-[20px] text-white mt-[60px]'>{t('section3.titreLogo')}</div>
        <div className='h-auto items-center grid grid-cols-2 gap-x-[30px] md:grid-cols-4 gap-y-10 md:gap-x-[55px] mt-[60px]'>

          <div className='relative w-[100%] group overflow-y-scroll h-[170px] md:h-[100%] flex md:items-center md:justify-center md:overflow-hidden'>
            <div className='absolute flex flex-col items-center right-[300px] rounded-tr-[20px] rounded-br-[20px] opacity-0 group-hover:opacity-100 group-hover:right-0 transition-all duration-700 justify-center w-[100%] h-auto md:h-[100%] bg-[#1D262B] z-20 p-[10px] md:p-[20px]'>
              <div className='text-[12px] text-white text-justify'>{t('section3.logo1')}</div>
              <div className='w-[50px] rounded-full h-[2px] mt-5 bg-white'></div>
            </div>
            <div className='absolute w-[100%] flex justify-center bottom-0 z-10'><img src={Ombre} alt='' className='w-[75%]'/></div>
            <div className='h-[160px] w-[160px] md:h-[250px] md:w-[250px] rounded-[10px] overflow-hidden'>
              <div className='flex items-center justify-center w-[100%] h-[100%]'><img src={Archange} alt='' className='w-[150px] md:w-[220px] md:h-[220px]'/></div>
            </div>
          </div>

          <div className='relative w-[100%] group overflow-y-scroll h-[170px] md:h-[100%] flex md:items-center md:justify-center md:overflow-hidden'>
            <div className='absolute flex flex-col items-center right-[300px] rounded-tr-[20px] rounded-br-[20px] opacity-0 group-hover:opacity-100 group-hover:right-0 transition-all duration-700 justify-center w-[100%] h-auto md:h-[100%] bg-[#1D262B] z-20 p-[10px] md:p-[20px]'>
              <div className='text-[12px] text-white text-justify'>{t('section3.logo2')}</div>
              <div className='w-[50px] rounded-full h-[2px] mt-5 bg-white'></div>
            </div>
            <div className='absolute bottom-0 flex justify-center z-10'><img alt='' src={Ombre} className='w-[75%]'/></div>
            <div className='h-[160px] w-[160px] md:h-[250px] md:w-[250px] rounded-[10px] overflow-hidden'>
              <div className='flex items-center justify-center w-[100%] h-[100%]'><img alt='' src={Afa} className='w-[150px] md:w-[220px] md:h-[220px]'/></div>
            </div>
          </div>

          <div className='relative w-[100%] group overflow-y-scroll h-[170px] md:h-[100%] flex md:items-center md:justify-center md:overflow-hidden'>
            <div className='absolute flex flex-col items-center right-[300px] rounded-tr-[20px] rounded-br-[20px] opacity-0 group-hover:opacity-100 group-hover:right-0 transition-all duration-700 justify-center w-[100%] h-auto md:h-[100%] bg-[#1D262B] z-20 p-[10px] md:p-[20px]'>
              <div className='text-[12px] text-white text-justify'>{t('section3.logo3')}</div>
              <div className='w-[50px] rounded-full h-[2px] mt-5 bg-white'></div>
            </div>
            <div className='absolute bottom-0 flex justify-center z-10'><img alt='' src={Ombre} className='w-[75%]'/></div>
            <div className='h-[160px] w-[160px] md:h-[250px] md:w-[250px] rounded-[10px] overflow-hidden'>
              <div className='flex items-center justify-center w-[100%] h-[100%]'><img alt='' src={Astr} className='w-[150px] md:w-[220px] md:h-[220px]'/></div>
            </div>
          </div>

          <div className='relative w-[100%] group overflow-y-scroll h-[170px] md:h-[100%] flex md:items-center md:justify-center md:overflow-hidden'>
            <div className='absolute flex flex-col items-center right-[300px] rounded-tr-[20px] rounded-br-[20px] opacity-0 group-hover:opacity-100 group-hover:right-0 transition-all duration-700 justify-center w-[100%] h-auto md:h-[100%] bg-[#1D262B] z-20 p-[10px] md:p-[20px]'>
              <div className='text-[12px] text-white text-justify'>{t('section3.logo4')}</div>
              <div className='w-[50px] rounded-full h-[2px] mt-5 bg-white'></div>
            </div>
            <div className='absolute bottom-0 flex justify-center z-10'><img alt='' src={Ombre} className='w-[75%]'/></div>
            <div className='h-[160px] w-[160px] md:h-[250px] md:w-[250px] rounded-[10px] overflow-hidden'>
              <div className='flex items-center justify-center w-[100%] h-[100%]'><img alt='' src={Cla} className='w-[150px] md:w-[220px] md:h-[220px]'/></div>
            </div>
          </div>

          <div className='relative w-[100%] group overflow-y-scroll h-[170px] md:h-[100%] flex md:items-center md:justify-center md:overflow-hidden'>
            <div className='absolute flex flex-col items-center right-[300px] rounded-tr-[20px] rounded-br-[20px] opacity-0 group-hover:opacity-100 group-hover:right-0 transition-all duration-700 justify-center w-[100%] h-auto md:h-[100%] bg-[#1D262B] z-20 p-[10px] md:p-[20px]'>
              <div className='text-[12px] text-white text-justify'>{t('section3.logo5')}</div>
              <div className='w-[50px] rounded-full h-[2px] mt-5 bg-white'></div>
            </div>
            <div className='h-[160px] w-[160px] md:h-[250px] md:w-[250px] rounded-[10px] overflow-hidden'>
              <div className='flex items-center justify-center w-[100%] h-[100%]'><img alt='' src={AL} className='w-[150px] md:w-[220px] md:h-[190px]'/></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Section3