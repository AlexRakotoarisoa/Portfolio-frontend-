import React, { useState, useEffect } from 'react';
import { UilTrash } from '@iconscout/react-unicons';
import { toast } from 'react-toastify';
import { Rings } from 'react-loader-spinner';
import './Archive.css';
import axios from 'axios';
import Confirmation from '../Confirmation/Confirmation';
import api from '../api';

const Archive = () => {
  const [offres, setOffres] = useState([]);
  const [chargement, setChargement] = useState(false);
  const [selected, setSelected] = useState(false);
  const [id, setid] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    deleteArchive(id);
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const getOffres = async () => {
    setChargement(true);
    try {
      const response = await api.get(`offre/offreoui/`);
      setOffres(response.data);
      setChargement(false);
    } catch (error) {
      console.error("Erreur de la recuperation de offre de la base de donnée:", error);
    }
  };

  const voirDetail = (offre) => {
    setid(offre.id);
  };

  useEffect(() => {
    getOffres();
  }, []);

  const deleteArchive = async (id) => {
    try {
      await api.delete(`offre/offreoui/${id}/`);
      const updatedOffres = offres.filter(offre => offre.id !== id);
      setOffres(updatedOffres);
      setid("");
      toast.success("Suppression réussi");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'offre:", error);
    }
  };

  return (
    <div className="archive_Principale">
      {chargement && (
        <div className="chargement_offreArchive">
          <div className="chargement_offreArchive1">
            <Rings color="#36D7B7" />
          </div>
        </div>
      )}
      <Confirmation
        show={showModal}
        title="Confirmation de suppression"
        message="Êtes-vous sûr de vouloir supprimer cet élément ?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <div className="archive">
        <div className="archive0">
          <div style={{ paddingLeft: '30px' }}>OFFRE ARCHIVE</div>
        </div>
        <div className="archive1">
          <div className="archive2">
            {offres.map((offre, index) => {
              const dateEcheanceFormatee = new Date(offre.date_echeance).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              });
              return (
                <div
                  key={index}
                  onClick={() => { voirDetail(offre); setSelected(index); }}
                  className={selected === index ? 'contentArchive selectedArch' : 'contentArchive'}
                >
                  <div>{offre.titre}</div>
                  <div>{dateEcheanceFormatee}</div>
                  <div onClick={handleDeleteClick} className="deleteArchiveBtn">
                    <UilTrash size="30px" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Archive;
