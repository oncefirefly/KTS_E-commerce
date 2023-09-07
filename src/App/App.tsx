import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from 'components/Header';
import AboutUs from './pages/AboutUs/AboutUs';
import Categories from './pages/Categories/Categories';
import Products from './pages/Products/Products';

import './App.scss';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about_us" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
