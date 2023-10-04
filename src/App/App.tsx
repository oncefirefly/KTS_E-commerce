import * as React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { Header } from '@components/index';

import { Cart, Categories, Login, Product, Products } from './pages/';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
