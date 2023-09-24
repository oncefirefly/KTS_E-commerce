import * as React from 'react';
import { NavigateOptions, URLSearchParamsInit } from 'react-router-dom';
import { Option } from '@utils/types/MultiDropdownTypes';

export const useSetSearchParams = (
  paramName: string,
  paramValue: string | Option[],
  setSearchParams: (
    nextInit?: URLSearchParamsInit | ((prev: URLSearchParams) => URLSearchParamsInit) | undefined,
    navigateOpts?: NavigateOptions | undefined,
  ) => void,
) => {
  if (paramValue instanceof Array) {
    paramValue = paramValue.map((option) => option.key).join('|');
  }

  const setParams = React.useEffect(() => {
    setSearchParams((params) => ({
      ...Object.fromEntries(params.entries()),
      [paramName]: paramValue as string,
    }));
  }, [paramName, paramValue, setSearchParams]);

  return setParams;
};
