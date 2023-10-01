import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header } from '@components/index';

import { LoginData } from '@utils/types/LoginTypes';

import { AboutUs, Cart, Categories, Login, Product, Products } from './pages/';

const App: React.FC = () => {
  const [loginState, setLoginState] = React.useState<LoginData>({
    isLoggedIn: false,
    email: '',
    uid: '',
  });

  return (
    <BrowserRouter>
      <Header userName={loginState.email} />
      <main>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/login"
            element={<Login onLogin={({ email, uid }: LoginData) => setLoginState({ isLoggedIn: true, email, uid })} />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
