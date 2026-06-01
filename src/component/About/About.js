import { FaDownload } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  const cv = "images/Alex.pdf";

  return (
    <section className="w-full flex justify-center items-center px-[5%] py-[40px]">
      <div className="w-full max-w-[1500px] rounded-[22px] overflow-hidden border border-[#22303A] bg-[#0B141A] shadow-2xl">

        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr]">

          {/* Partie gauche */}
          <div className="bg-gradient-to-br from-[#0D1B22] to-[#101A20] p-[2.2rem] border-r border-[#1B2A33] flex flex-col justify-center">

            {/* Avatar */}
            <div className="w-[58px] h-[58px] rounded-full bg-[#16232B] border border-[#28404E] flex items-center justify-center text-white text-[18px] font-bold mb-[1.2rem]">
              AE
            </div>

            {/* Nom */}
            <div>
              <h1 className="text-white text-[24px] font-bold leading-tight">
                Alex Emilien
              </h1>

              <p className="text-[#7E99A8] text-[13px] mt-[8px] leading-[1.8]">
                {t("about.role")}
              </p>
            </div>

            <div className="w-[55px] h-[2px] bg-white/60 rounded-full mt-[1.5rem]" />
          </div>

          {/* Partie droite */}
          <div className="bg-[#111B22] p-[2.2rem] flex flex-col justify-between">

            <div>
              <p className="text-[11px] tracking-[3px] uppercase text-[#6C8594] font-semibold mb-[10px]">
                {t("about.title")}
              </p>

              <p className="text-[#A7B4BC] text-[13px] leading-[1.9]">
                {t("about.description")}
              </p>
            </div>

            {/* Bouton CV */}
            <a
              href={cv}
              download="CV_Rakotoarisoa_Alex.pdf"
              className="mt-[1.8rem] inline-flex hidden items-center gap-[8px] px-[18px] py-[10px] rounded-[10px] bg-white text-black text-[13px] font-semibold hover:bg-gray-100 transition-all duration-300 w-fit"
            >
              <FaDownload size={12} />
              {t("about.cv")}
            </a>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;