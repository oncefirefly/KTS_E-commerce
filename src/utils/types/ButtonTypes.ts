export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  disabled?: boolean;
  color?: 'primary' | 'secondary';
  children: React.ReactNode;
};
