export type ProductTitleProps = {
  className?: string;
};

export type ProductsSearchInputProps = {
  className?: string;
  onSearch: (value: string) => void;
};

export type ProductsMultiDropdownProps = {
  /* TODO: setProducts ... */
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
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
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
