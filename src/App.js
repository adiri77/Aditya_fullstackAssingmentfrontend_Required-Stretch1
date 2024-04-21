import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProfileList from './components/ProfileList';
import SignUp from './components/SignUp';
import EditProfile from './components/EditProfile';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewProfile from './components/ViewProfile';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProfileList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />
        <Route path="/profile/:id" element={<ViewProfile/>}/>
  <Route path="/login" element={<Login/>}/>
        {/* Include additional routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
