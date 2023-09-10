import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from 'components/Header';

import AboutUs from './pages/AboutUs/AboutUs';
import Categories from './pages/Categories/Categories';
import Product from './pages/Product';
import Products from './pages/Products/Products';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about_us" element={<AboutUs />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
