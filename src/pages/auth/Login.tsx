import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginApi } from '../../api/auth.service';

const Login = () => {
   const navigate = useNavigate();

   const [email, setEmail] = useState('example@gmail.com');
   const [name, setName] = useState('');
   const [password, setPassword] = useState('12345678');
   const [rePassword, setRePassword] = useState('');

   const logInClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      loginApi(
         {
            email,
            password,
         },
         (isOk, result) => {
            if (isOk) {
               toast.success('Login was successful');
               localStorage.setItem('AuthToken', result.token);
               // setContext
               // setIsUserLogin(true)
               navigate('/admin/home');
            } else {
               toast.error(result.response.data.message);
               console.log(result);
            }
         },
      );
   };

   return (
      <div className="container">
         <form className="pt-3 col-sm-6 col-md-4 col-lg-4">
            <div className="mb-3">
               <label className="form-label">Email</label>
               <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={e => {
                     setEmail(e.target.value);
                  }}
               />
            </div>
            <div className="mb-3">
               <label className="form-label">Password</label>
               <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={e => {
                     setPassword(e.target.value);
                  }}
               />
            </div>
            <button
               type="submit"
               className="btn btn-primary w-100"
               onClick={e => {
                  logInClick(e);
               }}
            >
               Login
            </button>
         </form>
      </div>
   );
};

export default Login;
