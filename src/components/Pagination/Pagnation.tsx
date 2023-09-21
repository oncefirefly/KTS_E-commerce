import classnames from 'classnames';
import * as React from 'react';

import { Text } from 'components/';
import { ArrowLeftIcon } from 'components/icons';

import { usePagination, DOTS } from 'utils/hooks/usePagination';

import { PaginationProps } from 'utils/types/PaginationTypes';

import paginationStyles from './Pagination.module.scss';

export const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const lastPage = paginationRange[paginationRange.length - 1];

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage === lastPage) return;

    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage === 1) return;

    onPageChange(currentPage - 1);
  };

  return (
    <ul className={classnames(paginationStyles.pagination_container, className ? { [className]: className } : '')}>
      <li
        className={classnames(paginationStyles.pagination_item, {
          [paginationStyles.item_disabled]: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <ArrowLeftIcon className={paginationStyles.arrow_left} />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className={paginationStyles.item}>
              <Text view="button" weight="medium">
                &#8230;
              </Text>
            </li>
          );
        }

        return (
          <li
            key={index}
            className={classnames(paginationStyles.pagination_item, {
              [paginationStyles.item_selected]: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(+pageNumber)}
          >
            <Text view="button" weight="medium">
              {pageNumber}
            </Text>
          </li>
        );
      })}
      <li
        className={classnames(paginationStyles.pagination_item, {
          [paginationStyles.item_disabled]: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <ArrowLeftIcon className={classnames(paginationStyles.arrow_right)} />
      </li>
    </ul>
  );
};

export default Pagination;
