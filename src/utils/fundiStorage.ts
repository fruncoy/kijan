import { Fundi, FundiFormData } from '../types/fundi';

const FUNDIS_KEY = 'fundis';

export const fundiStorage = {
  getFundis: (): Fundi[] => {
    const fundis = localStorage.getItem(FUNDIS_KEY);
    return fundis ? JSON.parse(fundis) : [];
  },

  saveFundi: (fundi: Fundi) => {
    const fundis = fundiStorage.getFundis();
    localStorage.setItem(FUNDIS_KEY, JSON.stringify([...fundis, fundi]));
  },

  updateFundi: (updatedFundi: Fundi) => {
    const fundis = fundiStorage.getFundis();
    const updatedFundis = fundis.map(fundi => 
      fundi.id === updatedFundi.id ? updatedFundi : fundi
    );
    localStorage.setItem(FUNDIS_KEY, JSON.stringify(updatedFundis));
  },

  deleteFundi: (fundiId: string) => {
    const fundis = fundiStorage.getFundis();
    localStorage.setItem(
      FUNDIS_KEY,
      JSON.stringify(fundis.filter(fundi => fundi.id !== fundiId))
    );
  },
};