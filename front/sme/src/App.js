import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import Manage from './Components/Manage';
import Network from './Components/Network';
import Profile from './Components/Profile';
import Register from './Components/Register';
import Search from './Components/Search';
import SME from './Components/SME';
import LandingPage from './Components/LandingPage'
import './App.css';
import { createContext, useEffect, useState } from 'react';
import EditProfile from './Components/EditProfile';
import Denied from './Denied';

export const AppContext = createContext();

function App() {
  const [removethislater, setremovethislater] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(()=> {
    if(sessionStorage.getItem('loggedInUser') !== null) {
      setCurrentUser(JSON.parse(sessionStorage.getItem('loggedInUser')));
    } 
  },[])

  return (
    <AppContext.Provider value={{
      removethislater,
      setremovethislater,
      meetings,
      setMeetings,
      currentUser,
      setCurrentUser
    }}
    >
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/register/:id' element={<LandingPage />}></Route>
          <Route path='/profile/:id' element={<Profile />}></Route>
          <Route path='/network' element={<Network />}></Route>
          <Route path='/sme/:id' element={<SME />}></Route>
          <Route path='/manage' element={<Manage />}></Route>
          <Route path='/search/:searchQuery' element={<Search />}></Route>
          <Route path='/editProfile' element={<EditProfile />}></Route>
          <Route path='/denied' element={<Denied />}></Route>
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;