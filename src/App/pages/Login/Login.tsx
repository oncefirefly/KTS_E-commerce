import classNames from 'classnames';
import { signInWithEmailAndPassword } from 'firebase/auth';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Input, Text } from '@components/index';

import { LoginPageProps } from '@utils/types/LoginTypes';

import { auth } from '../../../firebase';

import loginStyles from './Login.module.scss';

export const Login: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = React.useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    const { email, password } = loginData;

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        onLogin({ email: user.email!, uid: user.uid });
      })
      .catch((error) => {
        const errorMessage = error.message;
        throw new Error(errorMessage);
      });

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
