import React, { FC, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './pages/log-in-page/LogInScreen';
import HomePageScreen from './pages/home-page/HomePageComponent'
import DynamicPostList from './pages/dynamic-post-list/DynamicPostList';

const host = process.env['REACT_APP_BACKEND_HOST'];
const port = process.env['REACT_APP_BACKEND_PORT'];
const url = `${host}:${port}`;

export const App: FC = () => {
  useEffect(() => {
    fetch(`${host}:${port}/ping`)
      .then((response) => response.json())
      .then(json => {
        console.info(json);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

  const backend = `Backend hosted on ${url}`;

  return (
    <Router>
      <main>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/home" element={<HomePageScreen />} />
          <Route path="/home/:senderId" element={<DynamicPostList />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </main>
    </Router>
  );
}
