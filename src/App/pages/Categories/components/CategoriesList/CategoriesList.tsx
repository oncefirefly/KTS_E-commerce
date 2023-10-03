import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductCard } from '@components/index';

import { ProductCategoriesList } from '@utils/types/ProductTypes';

import categoriesListStyles from './CategoriesList.module.scss';

export const CategoriesList: React.FC<ProductCategoriesList> = observer(({ className, categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/?page=1&search=&categories=${categoryId}`);
  };

  return (
    <section className={className || ''}>
      <div className={categoriesListStyles.categories_list_container}>
        {categories.map(({ id, name, image }) => (
          <ProductCard key={id} image={image} title={name} onClick={() => handleCategoryClick(id)} />
        ))}
      </div>
    </section>
  );
});
