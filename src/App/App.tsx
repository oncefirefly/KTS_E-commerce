import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header } from '@components/index';

import { AboutUs, Categories, Product, Products } from './pages/';

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
