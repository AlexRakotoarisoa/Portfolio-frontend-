import React from 'react'
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

const experiences = [
  {
    dateKey: 'sectionx.t022',
    orgKey: 'sectionx.t011',
    descKey: 'sectionx.t033',
    tags: ['IDS/IPS', 'Suricata', 'ELK Stack'],
    badge: 'Cybersécurité',
  },
  {
    dateKey: 'sectionx.t12',
    orgKey: 'sectionx.t11',
    descKey: 'sectionx.t13',
    tags: ['ReactJS', 'Django', 'Figma'],
    badge: null,
  },
  {
    dateKey: 'sectionx.t22',
    orgKey: 'sectionx.t21',
    descKey: 'sectionx.t23',
    tags: ['Java'],
    badge: null,
  },
  {
    dateKey: 'sectionx.t32',
    orgKey: 'sectionx.t31',
    descKey: 'sectionx.t33',
    tags: ['JavaScript', 'NodeJS'],
    badge: null,
  },
];

const SectionX = () => {
  const { t } = useTranslation();

  return (
    <div id="sx" className='flex items-center flex-col h-auto w-full bg-[#141C21] py-[60px]'>

      {/* Titre */}
      <div className='w-[90%] mb-[50px]'>
        <div className='text-[22px] text-white audio'>{t('sectionx.grandTitre')}</div>
        <motion.div
          className='bg-[#00BBFF] h-[3px] mt-[10px] rounded-full'
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "170px", opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
        />
      </div>

      {/* Timeline */}
      <div className='w-[90%] flex flex-col gap-0'>
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            className='grid grid-cols-[100px_1fr] md:grid-cols-[160px_1fr] gap-[20px] md:gap-[30px] pb-[2.5rem]'
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Date */}
            <div className='text-right pt-[3px]'>
              <span className='text-gray-500 text-[13px] leading-[1.6]'>
                {t(exp.dateKey)}
              </span>
            </div>

            {/* Contenu */}
            <div className='relative pl-[24px] border-l border-[#1E3A4A]'>

              {/* Dot */}
              <div className='absolute left-[-5px] top-[5px] w-[9px] h-[9px] rounded-full bg-white border-2 border-[#141C21]' />

              {/* Org */}
              <p className='text-white text-[17px] md:text-[18px] font-semibold m-0 mb-[6px]'>
                {t(exp.orgKey)}
              </p>

              {/* Badge cybersec */}
              {exp.badge && (
                <span className='inline-block text-[12px] px-[10px] py-[3px] rounded-full bg-[#0A2030] border border-[#60A5FA]/30 text-[#60A5FA] mb-[10px]'>
                  {exp.badge}
                </span>
              )}

              {/* Description */}
              <p className='text-gray-400 text-[14px] md:text-[15px] leading-[1.8] m-0 mb-[14px]'>
                {t(exp.descKey)}
              </p>

              {/* Tags */}
              <div className='flex flex-wrap gap-[6px]'>
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className='text-[12px] px-[12px] py-[3px] rounded-full bg-[#0D1B22] border border-[#1E3A4A] text-gray-400'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default SectionX;