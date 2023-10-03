import * as React from 'react';

import { Text } from '@components/index';

import { PageTitleProps } from '@utils/types/PageTitleTypes';

export const PageTitle: React.FC<PageTitleProps> = ({ className, title, subTitle }) => {
  return (
    <section className={className || ''}>
      <Text tag="h1" view="title" color="primary" maxLines={1}>
        {title}
      </Text>
      {subTitle?.length && (
        <Text view="p-20" color="secondary" maxLines={2}>
          {subTitle}
        </Text>
      )}
    </section>
  );
};
