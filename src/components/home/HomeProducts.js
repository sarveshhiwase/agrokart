import { useHistory } from 'react-router';

import HomeProductItem from './HomeProductItem';

import * as storageService from '../../services/storage';
import * as STORAGE_KEYS from '../../constants/storage-keys';

import * as routeService from '../../services/route';
import * as ROUTES from '../../constants/routes';

const HomeProducts = ({ products }) => {
  const history = useHistory();

  const onProductClicked = (product) => () => {
    if (product) {
      storageService.save({
        key: STORAGE_KEYS.PRODUCT,
        payload: JSON.stringify(product),
      });
      routeService.navigate({ route: ROUTES.DETAIL, push: history.push });
    }
  };

  return (
    <div className="mx-auto w-4/5 ">
      <div className="flex flex-wrap gap-8">
        {products && products.length === 0 && (
          <h3 className="text-xl font-bold text-center text-gray-700">
            No products to show.
          </h3>
        )}
        {products &&
          products.length !== 0 &&
          products.map((product) => (
            <HomeProductItem
              key={product.id}
              product={product}
              onProductClicked={onProductClicked}
            />
          ))}
      </div>
    </div>
  );
};

export default HomeProducts;
