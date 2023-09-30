import * as React from 'react';

import loadingSpinnerStyles from './LoadingSpinner.module.scss';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className={loadingSpinnerStyles.loading_spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
