import React, {useState} from 'react'
import './FormCandidat.css'
import { UilTimes, UilCloudUpload} from '@iconscout/react-unicons';
import InputMask from 'react-input-mask';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Rings } from 'react-loader-spinner';


const FormCandidat = ({idOffre, closeBtn, emploi}) => {

    const [erreur, setErreur] = useState(false)
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("")
    const [numero, setNumero] = useState("");
    const [cv, setCv] = useState(null);
    const [file, setFile]= useState("")
    const [chargement, setChargement] = useState(false)

    const selectionerCV = (event) => {
      const file = event.target.files[0];
      const allowedTypes = ['application/pdf', 'image/jpeg']; 
  
      if (file && !allowedTypes.includes(file.type)) {
          toast.error('Seuls les fichiers PDF et JPG sont autorisés.');
          setCv(null);  
          setFile("");  
      } else {
          setCv(file);  
          setFile(file.name); 
      }
  };
  
    const selectionEmail = (e) => {
      const value = e.target.value 
      setEmail(value)
      setErreur(false)
    }

    const selectionNumero = (e) => {
      setNumero(e.target.value)
    }
    const validationEmail = (value) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      const isValid = emailRegex.test(value);
      
      if (!isValid) {
        toast.error('Veuillez entrer un email valide.');
        setErreur(true)
      }
      return isValid;
    };
  


      const Postuler = async (event) => {
        event.preventDefault();
        const valid = validationEmail(email)
        if(valid){
        const num = numero.replace(/\s+/g, '');
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('email', email);
        formData.append('telephone', num);
        formData.append('offre', idOffre);
        formData.append('cv', cv);
        setChargement(true)
        try {
            const response = await axios.post('http://localhost:8000/postulation/', formData);
                setNom ("")
                setEmail ("")
                setNumero ("")
                setErreur(false)
                setCv(null)
                closeBtn()
                toast.success("Votre candidature a été soumise avec succès !");
          } catch (error) {
            if (error.response) {
                const errorMsg = error.response.data.error;
                if (errorMsg) {
                    toast.warn(errorMsg);
                    setErreur(true);
                } else {
                    toast.error("Une erreur s'est produite. Veuillez réessayer.");
                }
            } else {
                toast.error("Erreur de connexion au serveur.");
            }
        }finally{
            setChargement(false)
          }
        }
      };


  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className='formulaireAjout' >
         {chargement && (
              <div className='chargement-container'>
                <div className="chargement">
                  <Rings color="#36D7B7" />
                </div>
              </div>
            )}
        <div className="contenuFormulaireCandidat">
            <div className='bgCloseCandidat12'>
              <div className='btnCloseCandidat'>
                 <UilTimes color = '#000' onClick = {closeBtn}/>
              </div>
            </div>
            {/*className={selectedPostulations[currentIndex] === index ? 'avant selectedAvant ' : 'avant'}*/}
            <form action="" className="contenuFormulaireAjout" onSubmit={Postuler}>
                          <div className='titreFormCandidat'>
                          <p>Formulaire de Candidature</p>
                          </div>
                          <div className='entrerFormCandidat'>
                          <input 
                            type="text" 
                            name='emploi' 
                            className='champFormulaireCandidat' 
                            placeholder="Nom et Prénom" 
                            pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]+" 
                            title="Ce champ ne doit contenir que des lettres et des espaces."
                            required value={nom} 
                            onChange={(e) => setNom(e.target.value)}
                          /><br/>
                          </div>
                          <div className='entrerFormCandidat'>
                          <input 
                            type="email" 
                            name='email'  
                            className={erreur ? 'emailCandidat err ' : 'champFormulaireCandidat'} 
                            placeholder='Adresse e-mail' 
                            required value={email} 
                            onChange={selectionEmail}
                          /><br/>
                          </div>
                          <div className='entrerFormCandidat'>
                          <InputMask
                            mask="+261 99 99 999 99"
                            value={numero}
                            onChange={selectionNumero}
                            className="champFormulaireCandidat"
                            placeholder="Numéro de télephone"
                            required
                          />
                          </div>
                          <div className='entrerFormCandidat'>
                              <label className="uploadFile">
                                  <UilCloudUpload className="uploadIcon" />
                                     Importer CV
                                  <input type="file" onChange= {selectionerCV} required/>
                              </label>
                              <p className="file-name" style={{fontSize:'15px'}}>Fichier sélectionné : <span className='file-mobile'
                                style={{
                                  fontSize: '9px',
                                  wordWrap: 'break-word', 
                                  wordBreak: 'break-all', 
                                  display: 'inline-block', 
                                  maxWidth: '100%' 
                                }}  
                           >{file}</span></p>
                          </div>
                          <div className='Postuler'>
                            <button className='btn1' >Envoyer</button>
                          </div>
            </form>
        </div> 
    </motion.div>
  )
}

export default FormCandidat