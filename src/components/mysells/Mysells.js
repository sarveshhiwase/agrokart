import { useState, useEffect, useRef, useCallback, useContext } from 'react';

// import SearchCategories from './SearchCategories';
// import SearchProductItem from './SearchProductItem';
// SearchProductItem

import * as firebaseService from '../../services/firebase';
import * as routeService from '../../services/route';

import * as FIREBASE_KEYS from '../../constants/firebase-keys';
import * as ROUTES from '../../constants/routes';

import { Context } from '../../context/AppContext';
// import SearchProductItem from '../search/SearchProductItem';
import { useHistory } from 'react-router';
import HomeProductItem from '../home/HomeProductItem';

const Mysells = () => {
  const [products, setProducts] = useState([]);

  const productsRef = useRef(firebaseService.getRef(FIREBASE_KEYS.PRODUCTS));
  const tempRef = productsRef.current;

  const { user } = useContext(Context);

  const history = useHistory();

  const transformData = useCallback(
    (data) => {
      if (!data || !data.length || !user) return data;
      return data.filter((product) => product && product.createdBy === user.id);
    },
    [user]
  );

  const onDataLoaded = useCallback(
    (val) => {
      if (val) {
        const keys = Object.keys(val);
        const data = keys.map((key) => val[key]);
        setProducts(() => transformData(data));
      }
    },
    [transformData]
  );

  const sellClick = () => {
    routeService.navigate({ route: ROUTES.SELL, push: history.push });
  };

  const postDetailsClick = (product) => () => {
    if (product) {
      console.log(product);
      routeService.navigate({
        route: ROUTES.POST_DETAILS + `/${product.id}`,
        push: history.push,
      });
    }
  };

  const loadProducts = useCallback(() => {
    firebaseService.getDataRealtime({
      ref: productsRef,
      callback: onDataLoaded,
    });
  }, [productsRef, onDataLoaded]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    return () => {
      setProducts(() => []);
      tempRef.off();
    };
  }, [tempRef]);

  return (
    <div className="mx-auto w-4/5 min-h-screen">
      {products && products.length === 0 && (
        <h3 className="text-xl font-bold text-center text-gray-700">
          No posts yet, add one{' '}
          <span className="link-button" onClick={sellClick}>
            {' '}
            now
          </span>{' '}
          to sell your agro products.
        </h3>
      )}
      {products && products.length !== 0 && (
        <div className="flex flex-wrap items-center gap-4">
          {products &&
            products.length !== 0 &&
            products.map((product) => (
              <HomeProductItem
                key={product.id}
                product={product}
                onProductClicked={postDetailsClick}
              />
            ))}
        </div>
      )}

      <div className="search__rer"></div>
    </div>
  );
};

export default Mysells;
