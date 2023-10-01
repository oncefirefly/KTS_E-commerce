export type LoginData = {
  isLoggedIn?: boolean;
  email: string;
  uid: string;
};

export type LoginPageProps = {
  onLogin: (data: LoginData) => void;
};
