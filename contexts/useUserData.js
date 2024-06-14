import React, { createContext, useContext, useState } from 'react';

// Créez un contexte UserDataContext
const UserDataContext = createContext();

// Créez un Hook personnalisé pour utiliser le contexte UserDataContext
export function useUserData() {
  return useContext(UserDataContext);
}

// Composant Provider pour envelopper l'application et fournir les données utilisateur
export function UserDataProvider({ children }) {


  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [userData, setUserData] = useState(null);

  const [etudiants, setEtudiants] = useState([]);
  const [etudiant, setEtudiant] = useState();

  const [filiereSemetres, setFiliereSemetres] = useState([]);
  const [filiereSemetre, setFiliereSemetre] = useState(null);

  const [modules, setModules] = useState([]);
  const [module, setModule] = useState(null);

  const [notes, setNotes] = useState([]);

  const [path, setPath] = useState("http://127.0.0.1:5000")

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };


  const updateUserData = (data) => {
    setUserData(data);
  };

  const updateEtudiants = (data) => {
    setEtudiants(data)
  }
  const updateEtudiant = (data) => {
    setEtudiant(data)
  }

  const updateModules = (data) => {
    setModules(data)
  }
  const updateModule = (data) => {
    setModule(data)
  }

  const updateFiliereSemetres = (data) => {
    setFiliereSemetres(data)
  }
  const updateFiliereSemetre = (data) => {
    setFiliereSemetre(data)
  }

  const updateNotes = (data) => {
    setNotes(data)
  }

  return (
    <UserDataContext.Provider
      value={{
        userData, updateUserData,
        etudiants, updateEtudiants,
        etudiant, updateEtudiant,
        modules,updateModules,
        module,updateModule,
        filiereSemetres, updateFiliereSemetres,
        filiereSemetre, updateFiliereSemetre,
        notes, updateNotes,
        modalIsOpen, closeModal, openModal,
        path
      }}>
      {children}
    </UserDataContext.Provider>
  );
}
