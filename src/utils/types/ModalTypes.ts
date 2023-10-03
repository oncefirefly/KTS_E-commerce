export type ModalProps = {
  className?: string;
  type: 'alert' | 'confirm';
  title: string;
  text?: string;
  onClose: () => void;
  onConfirm?: () => void;
};
