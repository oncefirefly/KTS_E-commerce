import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'components/Button';
import ProductCard from 'components/ProductCard';

import { getProducts } from 'config/services/products';
import { OneProduct } from 'utils/types/ProductTypes';

import ProductsMultiDropdown from './components/ProductsMultiDropdown';
import ProductsSearchInput from './components/ProductsSearchInput/ProductsSearchInput';
import ProductsTitle from './components/ProductsTitle/ProductsTitle';

import 'styles/styles.scss';
import productsStyles from './Products.module.scss';

const Products: React.FC = () => {
  const navigate = useNavigate();

  const [products, setProducts] = React.useState<OneProduct[] | []>([]);

  // TODO: search filter
  const handleProductsSearch = (value: string) => {
    return value;
  };

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts();
    // console.log(fetchedProducts);

    setProducts(fetchedProducts);
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
            onClick={() => navigate(`/product/${product.id}`)}
          />
        ))}
      </section>
    </div>
  );
};

export default Products;
