import 'normalize.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/index/Homepage';
import './styles/style.scss';
import Users from './components/Users';
import Login from './components/Login/loginPage';
import PicnicIndex from './components/picnic/picnic_main/PicnicIndex';
import PicnicOffical from './components/picnic/picnic_official/PicnicOffical';
import PicnicOfficalDetail from './components/picnic/picnic_official/picnic_offical_detail/IndexOfficalDetail';
import IndexPrivateDetail from './components/picnic/private_pincnic/private_pincnic_detail/IndexPrivateDetail';
import CreatePincnic from './components/picnic/private_pincnic/CreatePincnic';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/activity/picnic" element={<PicnicIndex />} />
        <Route path="/activity/picnic/official" element={<PicnicOffical />} />
        <Route path="/activity/picnic/official/:id" element={<PicnicOfficalDetail />} />
        <Route path="/activity/picnic/group/:id" element={<IndexPrivateDetail />} />
        <Route path="/activity/picnic/create" element={<CreatePincnic />} />
        <Route path="/Users/*" element={<Users />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
