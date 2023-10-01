import * as React from 'react';

export const useOverflow = (dependency: unknown) => {
  React.useEffect(() => {
    if (dependency) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [dependency]);
};
