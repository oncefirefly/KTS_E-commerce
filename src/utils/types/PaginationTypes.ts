export interface usePaginationHookProps {
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

export interface PaginationProps extends usePaginationHookProps {
  onPageChange: (page: number) => void;
  className?: string;
}
