import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/mainpage';
import SignUpPage from './pages/signUpPage';
import LoginPage from './pages/loginPage';
import ProfilePage from './pages/profilePage';
import { useSelector } from 'react-redux';
import { RequireAuth } from 'react-auth-kit';

function App() {
  const theme = useSelector((state: any) => state.theme.theme);

  useEffect(() => {
    if (theme === 'light') {
      document.body.style.backgroundColor = '#FFFFFF';
    } else if (theme === 'dark') {
      document.body.style.backgroundColor = '#303030';
    }
  }, [theme]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<RequireAuth loginPath='/login'><MainPage /></RequireAuth>} />
          <Route path='/profile' element={<RequireAuth loginPath='/login'><ProfilePage /></RequireAuth>} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
