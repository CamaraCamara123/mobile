import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchEtudiants = async (path, updateEtudiants) => {
  const token = AsyncStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  try {
    const response = await axios.get(`${path}/etudiants`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    updateEtudiants(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données des étudiants :', error);
  }
};

export const fetchModule = async (path, module_id, updateModule) => {
  const token = AsyncStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  try {
    const response = await axios.get(`${path}/moduleById/${module_id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    updateModule(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données du module', error);
  }
};
