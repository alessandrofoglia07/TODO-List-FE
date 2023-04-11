import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/mainpage';
import { useSelector } from 'react-redux';

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
          <Route path='/' element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
