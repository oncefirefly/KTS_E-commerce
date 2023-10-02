import classNames from 'classnames';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Input, Text } from '@components/index';

import { userDataStore } from '@store/instance';

import loginStyles from './Login.module.scss';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = React.useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    const { email, password } = loginData;

    await userDataStore.login(email, password);

    navigate('/');
  };

  return (
    <section className={classNames(loginStyles.login, 'content_wrapper')}>
      <Text className={loginStyles.login_title} tag="h1" view="title">
        Login
      </Text>
      <form autoComplete="false">
        <div className={loginStyles.login_input_wrapper}>
          <Text view="p-18" weight="medium">
            Login
          </Text>
          <Input
            id="loginEmail"
            value={loginData.email}
            type="email"
            onChange={(value) =>
              setLoginData((prevLoginData) => ({
                ...prevLoginData,
                email: value,
              }))
            }
          />
        </div>
        <div className={loginStyles.login_input_wrapper}>
          <Text view="p-18" weight="medium">
            Password
          </Text>
          <Input
            id="loginPassword"
            value={loginData.password}
            type="password"
            onChange={(value) =>
              setLoginData((prevLoginData) => ({
                ...prevLoginData,
                password: value,
              }))
            }
          />
        </div>
        <Button onClick={handleLogin} className={loginStyles.login_submit}>
          <Text view="p-18" weight="bold">
            LOGIN
          </Text>
        </Button>
      </form>
    </section>
  );
};
