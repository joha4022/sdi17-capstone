import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import Manage from './Components/Manage';
import Network from './Components/Network';
import Profile from './Components/Profile';
import Register from './Components/Register';
import Search from './Components/Search';
import SME from './Components/SME';
import './App.css';
import { createContext, useState } from 'react';

export const AppContext = createContext();

function App() {
  const [removethislater, setremovethislater] = useState(false);

  return (
    <AppContext.Provider value={{
      removethislater,
      setremovethislater
    }}
    >
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/profile/:id' element={<Profile />}></Route>
          <Route path='/network' element={<Network />}></Route>
          <Route path='/sme/:id' element={<SME />}></Route>
          <Route path='/manage' element={<Manage />}></Route>
          <Route path='/search/:searchQuery' element={<Search />}></Route>
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
