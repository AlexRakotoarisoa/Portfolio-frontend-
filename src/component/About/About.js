

const About = () => {
  const cv = 'images/Alex.pdf';

  return (
        <div className='flex justify-center items-center gap-5 h-[460px] w-full md:h-[450px]  mt-[50px]'>
           <div className='hidden md:block bg-gray-500 w-[70%] h-full rounded-tr-[20px]'>

           </div>

           <div className='flex items-center justify-center w-full h-full'>
            <div className='w-[90%] md:w-[70%] h-full'>
              <h1 className='text-white text-[20px] mb-5 md:text-[25px] md:mb-10'>A propos de moi</h1>
              <p class="text-gray-400 leading-8 mb-[30px] md:mb-[80px]" >
              Étudiant en Master 2 Informatique et développeur d’applications web et mobiles, je conçois des solutions performantes, évolutives et centrées sur l’utilisateur. Passionné par la cybersécurité, je m’intéresse aux bonnes pratiques de développement sécurisé et à la protection des systèmes. Mon objectif : combiner développement et sécurité pour créer des applications fiables et sécurisées.
              </p>

              <a href={cv} download="CV_Rakotoarisoa_Alex.pdf"> 
                <span className='bg-white text-black px-[20px] py-[10px] text-[15px] h-[50px] rounded-[7px] '>
                    Télécharger CV
                </span>
              </a>

            </div>
           </div>
        </div> 
  )
}

export default About
