import { Option } from '@utils/types/MultiDropdownTypes';

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
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
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
