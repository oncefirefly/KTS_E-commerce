import classNames from 'classnames';
import * as React from 'react';

import { Button, Text } from '@components/index';

import { ModalProps } from '@utils/types/ModalTypes';

import modalStyles from './ModalWindow.module.scss';

export const ModalWindow: React.FC<ModalProps> = ({ className, title, text, type, onClose, onConfirm, ...props }) => {
  return (
    <div className={classNames(modalStyles.modal, { [`${className}`]: className })} {...props}>
      <Text view="p-20" weight="medium">
        {title}
      </Text>
      <Text view="p-14">{text}</Text>
      <div className={modalStyles.modal_controls}>
        {type === 'confirm' ? (
          <>
            <Button onClick={onClose} color="secondary">
              <Text>Cancel</Text>
            </Button>
            <Button onClick={onConfirm}>
              <Text>Confirm</Text>
            </Button>
          </>
        ) : (
          <Button onClick={onClose}>
            <Text>Close</Text>
          </Button>
        )}
      </div>
    </div>
  );
};
