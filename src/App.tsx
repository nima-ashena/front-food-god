import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import AddVocab from './pages/mutation-vocab/addRestaurantAdmin';
import EditVocab from './pages/mutation-vocab/editVocab';
import Vocabs from './pages/vocabs/Vocabs';
import Test from './components/Test';

import './style.css';
import VocabDict from './pages/vocabs/VocabDict';
import Home from './pages/Home';
import RoutesHandle from './handle.routes';

function App() {
   console.log(process.env.API_BASE_URL);
   
   return (
      <>
         <Header />
         <RoutesHandle/>
         <ToastContainer />
      </>
   );
}

export default App;
