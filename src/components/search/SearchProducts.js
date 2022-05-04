import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { useHistory } from 'react-router';

// import SearchCategories from './SearchCategories';
import SearchProductItem from './SearchProductItem';

import * as firebaseService from '../../services/firebase';
import * as storageService from '../../services/storage';
import * as routeService from '../../services/route';

import * as FIREBASE_KEYS from '../../constants/firebase-keys';
import * as STORAGE_KEYS from '../../constants/storage-keys';
import * as ROUTES from '../../constants/routes';
import { FaSpinner } from 'react-icons/fa';

import { Context } from '../../context/AppContext';

const SearchProducts = () => {
  const [products, setProducts] = useState([]);
  const [isloading, setLoading] = useState(true);

  const productsRef = useRef(firebaseService.getRef(FIREBASE_KEYS.PRODUCTS));
  const tempRef = productsRef.current;

  const { user } = useContext(Context);

  const history = useHistory();

  const transformData = useCallback(
    (data) => {
      if (!data || !data.length || !user) return data;
      return data.filter((product) => product && product.createdBy !== user.id);
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

  const loadProducts = useCallback(
    (keywords) => {
      firebaseService.getDataRealtimeQuery({
        ref: productsRef,
        query: FIREBASE_KEYS.NAME,
        criteria: keywords,
        callback: onDataLoaded,
      });
    },
    [productsRef, onDataLoaded]
  );

  useEffect(() => {
    const keywords = storageService.get(STORAGE_KEYS.KEYWORD);
    if (keywords) {
      loadProducts(keywords);
      setLoading(false);
    }
  }, [loadProducts]);

  useEffect(() => {
    return () => {
      setProducts(() => []);
      tempRef.off();
    };
  }, [tempRef]);

  const onProductClicked = (product) => () => {
    if (product) {
      storageService.save({
        key: STORAGE_KEYS.PRODUCT,
        payload: JSON.stringify(product),
      });
      routeService.navigate({
        route: ROUTES.DETAIL,
        push: history.push,
      });
    }
  };

  return (
    <div className="flex w-4/5 mx-auto justify-center items-center p-2">
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {isloading && <FaSpinner className="animate-spin" />}
        {isloading === false && (!products || products.length === 0) && (
          <div>
            <h3 className="text-xl font-bold text-center text-gray-700">
              No products found, for your search result.
            </h3>
          </div>
        )}
        {!isloading &&
          products &&
          products.length !== 0 &&
          products.map((product) => (
            <SearchProductItem
              key={product.id}
              product={product}
              onProductClicked={onProductClicked}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchProducts;
