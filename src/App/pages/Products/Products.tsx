import * as React from 'react';

import Button from 'components/Button';
import ProductCard from 'components/ProductCard';

import { getProducts } from 'config/services/products';
import { Product } from 'utils/types/ProductTypes';

import ProductsMultiDropdown from './components/ProductsMultiDropdown';
import ProductsSearchInput from './components/ProductsSearchInput/ProductsSearchInput';
import ProductsTitle from './components/ProductsTitle/ProductsTitle';

import 'styles/styles.scss';
import productsStyles from './Products.module.scss';

const Products: React.FC = () => {
  const [products, setProducts] = React.useState<Product[] | []>([]);

  const handleProductsSearch = (value: string) => {
    console.log(value);
  };

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts();

    setProducts(fetchedProducts);
    console.log(fetchedProducts);
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={`${productsStyles.products_content} content_wrapper`}>
      <ProductsTitle className={productsStyles.products_title} />
      <section className={productsStyles.products_search_controls}>
        <ProductsSearchInput className={productsStyles.products_search} onSearch={handleProductsSearch} />
        <ProductsMultiDropdown />
      </section>
      <section className={productsStyles.products_list}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.images[0]}
            captionSlot={product.category}
            title={product.title}
            subtitle={product.description}
            contentSlot={product.price}
            actionSlot={<Button>Add to Cart</Button>}
          />
        ))}
      </section>
    </div>
  );
};

export default Products;
