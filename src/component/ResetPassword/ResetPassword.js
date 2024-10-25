import './ResetPassword.css';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Rings } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';


const ResetPassword = () => {
    const { uid, token } = useParams(); // Obtenez uid et token des paramètres d'URL
    const [newPassword, setNewPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [error, setError] = useState('');
    const [chargement, setChargement] = useState(false)
    const navigate = useNavigate();



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

    const handlePasswordChange = (e) => {
        const newPasswordValue = e.target.value;
        setNewPassword(newPasswordValue);
        validatePassword(newPasswordValue);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== rePassword) {
            toast.error('Les mots de passe ne correspondent pas.')
        } else {   
        setChargement(true)
            try {
                const response = await fetch(`http://localhost:8000/auth/reset-password/${uid}/${token}/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ new_password: newPassword }), 
                });
        
                const data = await response.json();
                if (response.ok) {
                    toast.success('Mot de passe réinitialisé avec succès');
                    setTimeout(() => {
                        navigate('/dashboard');
                      }, 1000);
                } else {
                    toast.error('Erreur lors de la réinitialisation du mot de passe');
                }
            } catch (error) {
                console.error('Erreur:', error);
            }finally{
                setChargement(false)
            }
    }
    };

    return (
        <div className='resetContainer'>
            <div className='resetElement0'>
            {chargement && (
                        <div className='chargement-container2'>
                          <div className="chargement">
                            <Rings color="#36D7B7" />
                          </div>
                        </div>
                      )}
           
                <div className='resetElement'>
                    <h3 style={{ color: 'var(--bleub)' }}>Réinitialisation de votre mot de passe</h3>
                    <form onSubmit={handleSubmit} className='resetElement1'>
                        <input
                            type="password"
                            placeholder="Nouveau mot de passe"
                            value={newPassword}
                            onChange={handlePasswordChange}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirmer le mot de passe"
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                            disabled={!isPasswordValid} // Désactive le champ si le mot de passe n'est pas valide
                            required
                        />
                        {error && <p style={{ color: 'red', fontSize: '11px' }}>{error}</p>}
                        <button type="submit" className={!isPasswordValid ? 'disabled' : ''}>
                            Réinitialiser le mot de passe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
