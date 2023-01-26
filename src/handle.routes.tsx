import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAdminApi } from './api/auth.service';
import Login from './pages/auth/Login';
import Home from './pages/Home';
import AddRestaurantAdmin from './pages/mutation-vocab/addRestaurantAdmin';

const RoutesHandle = () => {
   useEffect(() => {}, []);

   return (
      <>
         <PublicRoute>
            <Routes>
               <Route path="/login" element={<Login />} />
            </Routes>
         </PublicRoute>
         <PrivateRoute>
            <Routes>
               <Route path="/admin/home" element={<Home />} />
               <Route
                  path="/admin/add-restaurant-admin"
                  element={<AddRestaurantAdmin />}
               />
               <Route
                  path="/admin/restaurants"
                  element={<AddRestaurantAdmin />}
               />
            </Routes>
         </PrivateRoute>
      </>
   );
};

const PrivateRoute = (props: any) => {
   const navigate = useNavigate();

   useEffect(() => {
      if (!localStorage.getItem('AuthToken')) {
         navigate('/login');
      } else {
         getAdminApi((isOk: boolean) => {
            if (isOk) {
               navigate('/admin/home');
            } else {
               navigate('/login');
            }
         });
      }
   }, []);

   return <>{props.children}</>;
};
const PublicRoute = (props: any) => {
   const navigate = useNavigate();

   useEffect(() => {
      if (!localStorage.getItem('AuthToken')) {
         navigate('/login');
      } else {
         console.log('Auth Token');
         getAdminApi((isOk: boolean) => {
            if (isOk) {
               navigate('/admin/home');
            } else {
               navigate('/login');
            }
         });
      }
   }, []);

   return <>{props.children}</>;
};

export default RoutesHandle;
