import { useState, useEffect, useCallback, useContext } from 'react';
import { useHistory } from 'react-router';

import SearchProductItem from './SearchProductItem';

import * as storageService from '../../services/storage';
import * as routeService from '../../services/route';
import firebase from 'firebase';

import * as STORAGE_KEYS from '../../constants/storage-keys';
import * as ROUTES from '../../constants/routes';
import { FaSpinner } from 'react-icons/fa';

import { Context } from '../../context/AppContext';

const SearchProducts = () => {
  const [products, setProducts] = useState([]);
  const [isloading, setLoading] = useState(true);

  const { user } = useContext(Context);

  const history = useHistory();

  const transformData = useCallback(
    (data) => {
      setLoading(false);
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
      } else {
        setLoading(false);
      }
    },
    [transformData]
  );

  const loadProducts = useCallback(
    (keywords) => {
      keywords = keywords.toLowerCase().trim().split(' ');
      firebase
        .database()
        .ref('products')
        .on('value', (snapshot) => {
          let prods = snapshot.val();
          let filterProducts = new Set();
          for (const [key, prod] of Object.entries(prods)) {
            let prodDesc = prod.description;
            let prodName = prod.name;
            prodDesc = prodDesc?.toLowerCase();
            prodName = prodName?.toLowerCase();
            keywords.forEach((keyword) => {
              if (
                prodDesc &&
                prodName &&
                (prodDesc.includes(keyword) || prodName.includes(keyword))
              ) {
                filterProducts.add(prod);
              }
            });
          }
          let filterarray = [...filterProducts];
          onDataLoaded(filterarray);
        });
    },
    [onDataLoaded]
  );

  useEffect(() => {
    const keywords = storageService.get(STORAGE_KEYS.KEYWORD);
    if (keywords) {
      loadProducts(keywords);
    }
  }, [loadProducts]);

  useEffect(() => {
    return () => {
      setProducts(() => []);
      // tempRef.off();
    };
  }, []);

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
    <div className="min-h-screen w-4/5 mx-auto p-2">
      <div className="flex justify-center flex-wrap gap-4">
        {isloading && <FaSpinner className="animate-spin text-2xl" />}
        {!isloading && (!products || products.length === 0) && (
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
