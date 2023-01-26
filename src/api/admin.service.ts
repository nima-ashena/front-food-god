import axios from 'axios';

import { BASEURL } from '.';
import { IAddRestaurantAdmin } from '../interface/restaurant.interface';

type ApiFunction = (isOk: boolean, resultData?: any) => void;

// Get Vocab
export const getVocabApi = (id: any, callBack: ApiFunction) => {
   axios
      .get(`${BASEURL}/vocabs/${id}`)
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false, err);
      });
};

// Get Vocabs
export const getVocabsApi = (callBack: ApiFunction, filters?: any[]) => {
   let url = `${BASEURL}/vocabs`;
   if (filters?.length)
      for (let i = 0; i < filters?.length; i++) {
         if (i == 0) url += `?${filters[i].name}=${filters[i].value}`;
         else url += `&${filters[i].name}=${filters[i].value}`;
      }
   axios
      .get(url)
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false, err);
      });
};

// Get Restaurants
export const getRestaurantsApi = (callBack: ApiFunction, filters?: any[]) => {
   let url = `${BASEURL}/vocabs`;
   if (filters?.length)
      for (let i = 0; i < filters?.length; i++) {
         if (i == 0) url += `?${filters[i].name}=${filters[i].value}`;
         else url += `&${filters[i].name}=${filters[i].value}`;
      }
   axios
      .get(url)
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false, err);
      });
};

// Add Restaurant Admin
export const addRestaurantAdminApi = (
   data: IAddRestaurantAdmin,
   callBack: ApiFunction,
) => {
   axios
      .post(`${BASEURL}`, data, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
         },
      })
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false, err);
      });
};

// Edit Vocab
export const editVocabApi = (
   vocabId: any,
   formData: any,
   callBack: ApiFunction,
) => {
   axios
      .put(`${BASEURL}/vocabs/${vocabId}`, formData)
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false, err);
      });
};

// Delete Vocab
export const deleteVocabApi = (vocabId: any, callBack: ApiFunction) => {
   axios
      .delete(`${BASEURL}/vocabs/${vocabId}`)
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false, err);
      });
};

// plus true guess Vocab
export const plusTrueVocabApi = (vocabId: any, callBack: ApiFunction) => {
   axios
      .post(`${BASEURL}/vocabs/plus-true-guess/${vocabId}`)
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false, err);
      });
};
