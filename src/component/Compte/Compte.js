import React, {useState, useEffect} from 'react'
import './Compte.css'
import { UilTimes, UilBars } from '@iconscout/react-unicons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Rings } from 'react-loader-spinner';
import api from '../api';



const Compte = ({setExpanded}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedAction, setSelectedAction] = useState("modifier")
    const [username, setUsername] = useState('');
    const [username1, setUsername1] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [email, setEmail] = useState ('')
    const [email1, setEmail1] = useState ('')
    const [menu, setMenu] = useState('false')
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [users, setUsers] = useState([]);
    const isSuperUser = true;
    const [password1, setPassword1] = useState("")

/*********** V A L I D A T I O N   M O T    D E   P A S S E *****************/
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordValid1, setIsPasswordValid1] = useState(false);
    const [error, setError] = useState('');
    const [error1, setError1] = useState('');
    const [chargement, setChargement] = useState(false)

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[\W_])(?=.{8,})/;

    if (!regex.test(password)) {
        setError('Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule et un caractère spécial.');
        setIsPasswordValid(false);
        return false;
    } else {
        setError(''); 
        setIsPasswordValid(true); 
        return true;
    }
};
const validatePassword1 = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[\W_])(?=.{8,})/;

  if (!regex.test(password)) {
      setError1('Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule et un caractère spécial.');
      setIsPasswordValid1(false);
      return false;
  } else {
      setError1(''); 
      setIsPasswordValid1(true); 
      return true;
  }
};
const validationEmail = (value) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isValid = emailRegex.test(value);
  
  if (!isValid) {
    toast.error('Veuillez entrer un email valide.');
  }
  return isValid;
};

const videInput = (e) => {
  setEmail('')
  setConfirmPassword('')
  setUsername('')
  setConfirmPassword('')
  setNewPassword('')
  setRetypePassword('')
  setPassword('')
  setPassword1('')
  setError('')
  setError1('')
  setOldPassword('')
  toogleMenu()
}

const handlePasswordChange = (e) => {
  const newPasswordValue = e.target.value;
  setNewPassword(newPasswordValue)
  validatePassword(newPasswordValue);
};

const handlePasswordChange1 = (e) => {
  const newPasswordValue = e.target.value;
  setPassword(newPasswordValue)
  validatePassword1(newPasswordValue);
};


const refreshAccessToken = async () => {
    const refresh_token = localStorage.getItem('refresh_token');

    try {
      const response = await axios.post('your_refresh_token_endpoint', {
        refresh_token: refresh_token,
      });

      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);

      return access_token;
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      throw error;
    }
    };


useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const access_token = await refreshAccessToken();
            originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
            return axios(originalRequest);
          } catch (refreshError) {
            console.error('Erreur lors du rafraîchissement du token:', refreshError);
            throw refreshError;
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
}, []);



const getDetailCompte = () =>{
    const token = localStorage.getItem('access_token');
    api.get('auth/users/me/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setUsername1(response.data.username);
      setEmail1(response.data.email)
      setPassword1(response.data.password)
    })
    .catch(error => {
      toast.error("Erreur.");
    });
}


useEffect(() => {
    getDetailCompte()
  }, []);


const changeProfil = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('access_token');
    api.put('auth/users/me/', {
      username: username1,
      email:email1
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      toast.success("Profil mis à jour.");
      getDetailCompte()
    })
    .catch(error => {
      toast.error("Erreur lors de la mise à jour.");
    });
};



/******************************************** */
const changePass = (e) => {
  e.preventDefault();
  setChargement(true);
  const token = localStorage.getItem('access_token');
  
  if (newPassword !== confirmPassword) {
    toast.error("Les nouveaux mots de passe ne correspondent pas.");
    setChargement(false); // Désactiver le chargement en cas d'erreur de validation
    return;
  }
  api.post('auth/users/set_password/', {
    current_password: oldPassword,
    new_password: newPassword
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    toast.success("Mot de passe changé.");
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
  })
  .catch(error => {
    toast.error("Ancien mot de passe incorrect.");
  })
  .finally(() => {
    setChargement(false); // Toujours désactiver le chargement à la fin de la requête
  });
};


/***************************************************/
    const handleOpen = () => {
        setIsVisible(false); // Initially set to false to prevent flickering on open
        setTimeout(() => {
          setIsVisible(true);
        }, 350);
      };
    
      // Optionally call handleOpen when the component mounts or receives props
      useEffect(() => {
        handleOpen();
      }, []);

      const toogleMenu = () => {
        setMenu(!menu)
      }
    


      const Enregistrer = async (e) => {
        e.preventDefault();
        
        if (password !== retypePassword) {
          toast.error("Les mots de passe ne correspondent pas");
          return;
        }
        const valid = validationEmail(email)
        if(valid){
        const token = localStorage.getItem('access_token'); 
        setChargement(true)
        try {
          const response = await api.post('auth/superusers/', {
            email: email,
            username: username,
            password: password,
            re_password: retypePassword
          }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          toast.success("Compte créé avec succès.");
          setRetypePassword('')
          setUsername('')
          setPassword('')
          setEmail('')
        } catch (error) {
          if (error.response && error.response.status === 400) {
            const errorMsg = error.response.data.error;
            if (errorMsg) {
                toast.warn(errorMsg);
              } else {
                toast.error("Une erreur s'est produite. Veuillez réessayer.");
              }
          } else {
            const errorMsg = error.response.data.error;
            toast.error(errorMsg);
          }
          
        } finally {
            setChargement(false)
        }
      }
      };
      
/*********************************** */
useEffect(() => {
  const fetchUsers = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await api.get('users/', {
        headers: {
         'Authorization': `Bearer ${token}`
        },
      });
      setUsers(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des utilisateurs');
    }
  };

  fetchUsers();
}, []);

// Fonction pour supprimer un utilisateur par ID
const deleteUser = async (userId) => {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
    try {
      await api.delete(`delete_user/${userId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`, // JWT token
        },
      });
      toast.success('Utilisateur supprimé avec succès');
      setUsers(users.filter(user => user.id !== userId)); // Mettre à jour la liste après suppression
    } catch (error) {
      toast.error('Erreur lors de la suppression de l\'utilisateur');
    }
  }
};



  return (
    <div className={`contentCompte ${isVisible ? 'visible' : ''}`}>
    <div className='contentCompte1'>
    {chargement && (
                          <div className='chargement-container2'>
                            <div className="chargement">
                              <Rings color="#36D7B7" />
                            </div>
                          </div>
    )}
        <div className='bgCloseCompte'>
            <div className='btnCloseCompte' onClick={() => setExpanded()}>
                <UilTimes color = '#000'/>
            </div>
        </div>
        <div className='navCompte'>
            <div className='navCompte0'>
                <div className='btnMenu' onClick={toogleMenu}>
                    <UilBars size="35px"/>
                </div>
                <div className={menu ?'navCompte1 selectedMenu':'navCompte1'}>
                    <div onClick={() => {setSelectedAction('modifier'); videInput()}}>
                        Modifier
                    </div>
                    <div onClick={() => {setSelectedAction('creer');videInput()}}>
                        Creer
                    </div>
                    <div onClick={() => {setSelectedAction('supprimer'); videInput()}}>
                        Supprimer
                    </div>
                </div>
            </div>
        </div>
        <div className='titreCompte' >  <p>{selectedAction === 'creer' ? 'Créer un compte' : selectedAction === 'modifier' ? 'Gérer mon compte' : 'Supprimer un compte'}</p></div>
        <div className='detailCompte'>

        {selectedAction === 'creer' && (
            <form onSubmit={Enregistrer} className='detailCompte'>
             <div className='inputCompte'>
                <input
                  type="email"
                  placeholder="Adresse e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='inputCompte'>
                <input
                  type="text"
                  placeholder="Nom d'utilisateur"
                  pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]+" 
                  title="Ce champ ne doit contenir que des lettres et des espaces."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className='inputCompte'>
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={handlePasswordChange1}
                  required
                />
              </div>
              <div className='inputCompte'>
                <input
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  className={`${!isPasswordValid1 ? 'disabled' : ''}`}  
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                  required
                />
              </div>
              {error1 && <p style={{ color: 'red', fontSize: '11px' }}>{error1}</p>}
              <button className={`creerCompte ${!isPasswordValid1 ? 'disabled' : ''}`}>Créer</button>
            </form>
          )}

          {selectedAction === 'modifier' && (
            <div className='detailCompte'>

            <form onSubmit={changeProfil} className='detailCompte'>
             <div className='inputCompte'>
                <input
                  type="email"
                  placeholder="Adresse e-mail"
                  value={email1}
                  onChange={(e) => setEmail1(e.target.value)}
                  required
                />
              </div>
                <div className='inputCompte'>
                 <input 
                    type="text" 
                    value={username1} 
                    onChange={(e) => setUsername1(e.target.value)} 
                    required
                />
                </div>
                <button   className='btnChangerEmail'>Changer</button>
                </form>
                <form onSubmit={changePass} className='detailCompte'>
                <div className='inputCompte'>
                    <input 
                        type="password" 
                        placeholder="Ancien mot de passe" 
                        value={oldPassword} 
                        onChange={(e) => setOldPassword(e.target.value)} 
                        required
                    />
                </div>
                <div className='inputCompte'>
                    <input 
                        type="password" 
                        placeholder="Nouveau mot de passe" 
                        value={newPassword} 
                        onChange={handlePasswordChange} 
                        required
                    />
                </div>
                <div className='inputCompte'>
                    <input 
                        type="password" 
                        placeholder="Confirmer le nouveau mot de passe" 
                        value={confirmPassword}
                        className={`${!isPasswordValid ? 'disabled' : ''}`}  
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required
                    />
                </div>
                    <button className={`changerMDP ${!isPasswordValid ? 'disabled' : ''}`}>Changer</button>
                    {error && <p style={{ color: 'red', fontSize: '11px' }}>{error}</p>}
                </form>
                </div>
          )}

          {selectedAction === 'supprimer' && (
            <div className='detailCompte'>
                  {users.map(user => (
                    <div key={user.id} className='compteUtilisateur'>
                      {user.username} ({user.email})
                      <button onClick={() => deleteUser(user.id)} className="deleteCompteUser">
                        Supprimer
                      </button>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
    </div>
    
  )
}

export default Compte