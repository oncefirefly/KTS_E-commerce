enum TextView {
  'title',
  'subtitle',
  'button',
  'p-20',
  'p-18',
  'p-16',
  'p-14',
}

enum TextTag {
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'div',
  'p',
  'span',
}

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: keyof typeof TextView;
  /** Html-тег */
  tag?: keyof typeof TextTag;
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};
