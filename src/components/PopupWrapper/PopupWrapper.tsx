import * as React from 'react';
import { PopupProps } from '@utils/types/PopupTypes';

import popupWrapperStyles from './PopupWrapper.module.scss';

export const PopupWrapper: React.FC<PopupProps> = ({ children }) => {
  return <div className={popupWrapperStyles.popup_wrapper}>{children}</div>;
};
