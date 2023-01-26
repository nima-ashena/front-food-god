import axios from "axios";
import { BASEURL } from ".";

type ApiFunction = (isOk: boolean, resultData?: any) => void;



// login 
export const loginApi = (user: any, callBack: ApiFunction) => {
   axios
      .post(`${BASEURL}/login`, user)
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false, err);
      });
};

// get admin 
export const getAdminApi = (callBack: ApiFunction) => {
   axios
      .get(`${BASEURL}/current`, {
         headers: { Authorization: `Bearer ${localStorage.getItem('AuthToken')}` }
      })
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false, err);
      });
};


