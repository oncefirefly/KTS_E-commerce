import { Option } from '@utils/types/MultiDropdownTypes';

export type ProductCategoriesList = {
  className?: string;
  categories: ProductCategory[] | [];
};

export type ProductsListProps = {
  className?: string;
  products: OneProduct[] | [];
  currentPage: number;
  totalProductsCount: number;
  onPageChange: (page: number) => void;
};

export type ProductsSearchInputProps = {
  className?: string;
  onSearch: (value: string) => void;
};

export type ProductsMultiDropdownProps = {
  selectedOptions: Option[];
  onChange: (options: Option[]) => void;
};

export type ProductsCountProps = {
  className?: string;
  count: number;
};

export type ProductCardProps = {
  className?: string;
  image: string;
  captionSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  contentSlot?: React.ReactNode;
  actionSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

export type ProductPageCardProps = {
  product: OneProduct;
};

export type OneProduct = {
  id: number;
  price: number;
  title: string;
  subtitle: string;
  description: string;
  images: string[];
  category: string;
};

export type ProductCategory = {
  id: number;
  name: string;
  image: string;
};
