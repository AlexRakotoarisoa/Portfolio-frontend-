import React from 'react'
import { 
  FaFigma, FaJava, FaJs, FaPython, FaPhp, FaReact, FaShieldAlt, 
  FaServer, FaNetworkWired, FaKey, FaNodeJs, FaDocker, FaGitAlt 
} from "react-icons/fa";
import { PiFileCSharp } from "react-icons/pi";
import { BiLogoTypescript, BiLogoPostgresql, BiNetworkChart } from "react-icons/bi";
import { 
  SiDjango, SiTailwindcss, SiMongodb, SiAdobephotoshop, 
  SiAdobeillustrator, SiGnubash 
} from "react-icons/si";
import { FiKey } from "react-icons/fi";
import { TbBrandMysql, TbBrandGithub } from "react-icons/tb";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

const Section4 = () => {
  const { t } = useTranslation();

  const Badge = ({ icon, label }) => (
    <div className="flex items-center gap-[10px] px-4 py-[9px] rounded-full text-[14px] font-medium border border-white/15 bg-white/5 text-gray-200 cursor-default">
      <span className="text-[18px] text-[#00BBFF] flex-shrink-0 leading-none">{icon}</span>
      <span className="leading-none">{label}</span>
    </div>
  );

  const CategoryCard = ({ title, children }) => (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="w-[3px] h-7 rounded-full bg-[#00BBFF] flex-shrink-0"></div>
        <h3 className="text-[17px] font-semibold text-white tracking-tight">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-[10px]">{children}</div>
    </div>
  );

  const categories = [
    {
      title: t('section4.competence1'),
      items: [
        { icon: <FaJava />, label: 'Java' },
        { icon: <PiFileCSharp />, label: 'C#' },
        { icon: <FaPhp />, label: 'PHP' },
        { icon: <FaJs />, label: 'JavaScript' },
        { icon: <FaPython />, label: 'Python' },
        { icon: <BiLogoTypescript />, label: 'TypeScript' },
      ]
    },
    {
      title: t('section4.competence2'),
      items: [
        { icon: <FaReact />, label: 'ReactJS' },
        { icon: <SiDjango />, label: 'Django' },
        { icon: <FaNodeJs />, label: 'NodeJS' },
        { icon: <SiTailwindcss />, label: 'TailwindCSS' },
      ]
    },
    {
      title: t('section4.competence3'),
      items: [
        { icon: <TbBrandMysql />, label: 'MySQL' },
        { icon: <BiLogoPostgresql />, label: 'PostgreSQL' },
        { icon: <SiMongodb />, label: 'MongoDB' },
      ]
    },
    {
      title: t('section4.competence4'),
      items: [
        { icon: <SiAdobephotoshop />, label: 'Adobe Photoshop' },
        { icon: <SiAdobeillustrator />, label: 'Adobe Illustrator' },
        { icon: <FaFigma />, label: 'Figma' },
      ]
    },
    {
      title: 'DevOps & Tools',
      items: [
        { icon: <FaDocker />, label: 'Docker' },
        { icon: <FaGitAlt />, label: 'Git' },
        { icon: <TbBrandGithub />, label: 'GitHub' },
      ]
    }
  ];

  const blueTeamItems = [
    { icon: <FaShieldAlt />, label: 'Suricata' },
    { icon: <FaServer />, label: 'ELK Stack' },
    { icon: <FaShieldAlt />, label: 'IDS / IPS' },
    { icon: <FaNetworkWired />, label: 'Pare-feu' },
    { icon: <FaKey />, label: 'VPN' },
    { icon: <FiKey />, label: 'Auth & Authz' },
    { icon: <BiNetworkChart />, label: 'TCP/IP, DNS, DHCP' },
    { icon: <FaNetworkWired />, label: 'iptables' },
    { icon: <FaShieldAlt />, label: 'TheHive' },
  ];

  const redTeamItems = [
    { icon: <FaShieldAlt />, label: 'Kali Linux' },
    { icon: <BiNetworkChart />, label: 'Wireshark' },
    { icon: <FaNetworkWired />, label: 'Nmap' },
    { icon: <BiNetworkChart />, label: 'Netcat' },
    { icon: <FaShieldAlt />, label: 'Sliver C2' },
    { icon: <FiKey />, label: 'Mimikatz' },
    { icon: <FaServer />, label: 'Active Directory' },
    { icon: <FaServer />, label: 'PowerShell' },
    { icon: <SiGnubash />, label: 'Bash Scripting' },
  ];

  return (
    <div id="s4">
      <div className='relative text-white flex h-auto items-center flex-col pt-[90px] pb-20 bg-[#141C21] w-full overflow-hidden md:pt-[80px]'>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00BBFF]/[0.04] rounded-full"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00BBFF]/[0.03] rounded-full"></div>
        </div>

        {/* Titre original */}
        <div className='relative z-10 w-[90%] mb-12'>
          <div className='text-[22px] text-white audio'>
            {t('section4.grandTitre')}
          </div>
          <motion.div
            className='bg-[#00BBFF] h-[3px] mt-[10px] rounded-full'
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "100px", opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: true }}
          />
        </div>

        {/* Grille */}
        <div className='relative z-10 w-[90%] flex flex-col gap-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {categories.map((cat, idx) => (
              <CategoryCard key={idx} title={cat.title}>
                {cat.items.map((item, i) => (
                  <Badge key={i} icon={item.icon} label={item.label} />
                ))}
              </CategoryCard>
            ))}
          </div>

          {/* Cybersécurité */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-[3px] h-7 rounded-full bg-[#00BBFF] flex-shrink-0"></div>
              <h3 className="text-[17px] font-semibold text-white tracking-tight">
                {t('section4.competence5')}
              </h3>
            </div>

            {/* Blue Team */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#00BBFF] flex-shrink-0"></div>
                <span className="text-[12px] font-semibold text-[#00BBFF] uppercase tracking-widest">
                  Blue Team — Défense
                </span>
              </div>
              <div className="flex flex-wrap gap-[10px]">
                {blueTeamItems.map((item, idx) => (
                  <Badge key={`b-${idx}`} icon={item.icon} label={item.label} />
                ))}
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6"></div>

            {/* Red Team */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#FF6B4A] flex-shrink-0"></div>
                <span className="text-[12px] font-semibold text-[#FF6B4A] uppercase tracking-widest">
                  Red Team — Offensif
                </span>
              </div>
              <div className="flex flex-wrap gap-[10px]">
                {redTeamItems.map((item, idx) => (
                  <Badge key={`r-${idx}`} icon={item.icon} label={item.label} />
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section4;