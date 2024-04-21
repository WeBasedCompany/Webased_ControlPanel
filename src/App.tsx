import { useState, createContext, useContext, useMemo } from 'react';
import './App.css';
import LoginComponent from './Components/LoginComponent';


import { LoginContext, UserContext } from './Components/Context';
import LoginPage from './Components/LoginPage';
import ProfilePage from './Components/ProfilePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{user, setUser}}>
      <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        {isLoggedIn ? <ProfilePage /> : <LoginPage />}
      </LoginContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
