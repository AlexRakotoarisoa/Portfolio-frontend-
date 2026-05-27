import React from 'react'
import { motion } from "framer-motion";
import MobileAnimation from '../MobileAnimation';
import { useTranslation } from 'react-i18next';
import { FaCode, FaImage, FaLock } from "react-icons/fa";

const cards = [
  {
    icon: <FaCode size={18} />,
    titleKey: 'section2.titre1',
    descKey: 'section2.description1',
    tags: ['React', 'Django', 'NodeJS'],
  },
  {
    icon: <FaLock size={18} />,
    titleKey: 'section2.titre2',
    descKey: 'section2.description2',
    tags: ['Suricata', 'ELK Stack', 'SOC Lab'],
  },
  {
    icon: <FaImage size={18} />,
    titleKey: 'section2.titre3',
    descKey: 'section2.description3',
    tags: ['Illustrator', 'Photoshop', 'Figma'],
  },
];

const Section2 = () => {
  const { t } = useTranslation();
  const isMobile = MobileAnimation();

  const motionProps = isMobile
    ? {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: "easeOut" },
        viewport: { once: true, amount: 0.3 },
      }
    : {};

  return (
    <div id="s2" className='flex items-center flex-col bg-[linear-gradient(to_top_right,#141C21_55%,#103145_90%)] w-full h-auto pt-[60px] pb-[15px]'>

      {/* Titre */}
      <div className='w-[90%] mb-[40px]'>
        <div className='text-[22px] text-white audio'>{t('section2.grandTitre')}</div>
        <motion.div
          className='bg-[#00BBFF] h-[3px] mt-[10px] rounded-full'
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "130px", opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
        />
      </div>

      {/* Cartes */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-[16px] w-[90%]'>
        {cards.map((card, i) => (
          <motion.div
            key={i}
            {...motionProps}
            transition={{ ...motionProps.transition, delay: i * 0.1 }}
            className='bg-[#0D1B22] border border-[#1E3A4A] rounded-[14px] p-[24px] flex flex-col gap-[14px] hover:border-[#2A4A5A] transition-all duration-300'
          >
            {/* Icône */}
            <div className='w-[42px] h-[42px] rounded-[10px] bg-[#141C21] border border-[#1E3A4A] flex items-center justify-center text-gray-400'>
              {card.icon}
            </div>

            {/* Titre */}
            <p className='text-white text-[15px] font-semibold m-0'>
              {t(card.titleKey)}
            </p>

            {/* Description */}
            <p className='text-gray-400 text-[13px] leading-[1.8] m-0 flex-grow'>
              {t(card.descKey)}
            </p>

            {/* Tags */}
            <div className='flex flex-wrap gap-[6px] pt-[8px] border-t border-[#1E3A4A]'>
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className='text-[11px] px-[10px] py-[3px] rounded-full bg-[#141C21] border border-[#1E3A4A] text-gray-500'
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default Section2;