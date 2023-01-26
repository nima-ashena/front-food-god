import { stringify } from 'querystring';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { addRestaurantAdminApi } from '../../api/admin.service';
import { IAddRestaurantAdmin } from '../../interface/restaurant.interface';
import './style.css';

const AddRestaurantAdmin = () => {
   const [restaurantData, setRestaurantData] = useState<IAddRestaurantAdmin>({
      name: 'test1',
      email: 'test@t.com',
      password: '1234',
      phone: '1234',
   });

   const addRestaurantAdminClick = async (
      event: React.FormEvent<HTMLFormElement>,
   ) => {
      event.preventDefault();
      if (restaurantData.name == '') return;

      const id = toast.loading('Adding Restaurant...');
      addRestaurantAdminApi(restaurantData, (isOk, result) => {
         if (isOk) {
            toast.update(id, {
               render: 'Restaurant added successfully',
               type: 'success',
               isLoading: false,
               autoClose: 2000,
            });
            setRestaurantData({
               name: '',
               email: '',
               password: '',
               phone: '',
            });
         } else {
            console.log(result.message);
            toast.update(id, {
               render: result.response.data.message,
               type: 'error',
               isLoading: false,
               autoClose: 2000,
            });
         }
      });
   };

   return (
      <div className="container">
         <form
            className="pt-3 col-sm-6 col-md-4 col-lg-4"
            onSubmit={event => {
               addRestaurantAdminClick(event);
            }}
         >
            <div className="mb-3">
               <label className="form-label">Name</label>
               <input
                  type="text"
                  className="form-control"
                  onChange={e => {
                     setRestaurantData({
                        ...restaurantData,
                        name: e.target.value,
                     });
                  }}
                  value={restaurantData.name}
               />
            </div>
            <div className="mb-3">
               <label className="form-label">Email</label>
               <input
                  type="text"
                  className="form-control"
                  onChange={e => {
                     setRestaurantData({
                        ...restaurantData,
                        email: e.target.value,
                     });
                  }}
                  value={restaurantData.email}
               />
            </div>
            <div className="mb-3">
               <label className="form-label">Phone Number</label>
               <input
                  type="text"
                  className="form-control"
                  onChange={e => {
                     setRestaurantData({
                        ...restaurantData,
                        phone: e.target.value,
                     });
                  }}
                  value={restaurantData.phone}
               />
            </div>
            <div className="mb-3">
               <label className="form-label">Password</label>
               <input
                  type="text"
                  className="form-control"
                  onChange={e => {
                     setRestaurantData({
                        ...restaurantData,
                        password: e.target.value,
                     });
                  }}
                  value={restaurantData.password}
               />
            </div>
            <button
               type="submit"
               className="btn btn-primary btn-lg w-100 add-btn"
            >
               Add Restaurant Admin
            </button>
         </form>
      </div>
   );
};

export default AddRestaurantAdmin;
