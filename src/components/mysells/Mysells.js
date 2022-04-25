import { useState, useEffect, useRef, useCallback, useContext } from 'react';
// import { useHistory } from 'react-router';

// import SearchCategories from './SearchCategories';
// import SearchProductItem from './SearchProductItem';
// SearchProductItem

import * as firebaseService from '../../services/firebase';
import * as storageService from '../../services/storage';
import * as routeService from '../../services/route';

import * as FIREBASE_KEYS from '../../constants/firebase-keys';
import * as STORAGE_KEYS from '../../constants/storage-keys';
import * as ROUTES from '../../constants/routes';

import { Context } from '../../context/AppContext';
import SearchProductItem from '../search/SearchProductItem';

const Mysells = () => {
  const [products, setProducts] = useState([]);

  const productsRef = useRef(firebaseService.getRef(FIREBASE_KEYS.PRODUCTS));
  const tempRef = productsRef.current;

  const { user } = useContext(Context);

  // const history = useHistory();

  const transformData = useCallback(
    (data) => {
      if (!data || !data.length || !user) return data;
      console.log(data);
      return data.filter((product) => product && product.createdBy === user.id);
    },
    [user]
  );

  const onDataLoaded = useCallback(
    (val) => {
      console.log(val);
      if (val) {
        const keys = Object.keys(val);
        const data = keys.map((key) => val[key]);
        setProducts(() => transformData(data));
      }
    },
    [transformData]
  );

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
    <div className="search__re">
      {/* <div className="search__rel">
        <SearchCategories />
      </div> */}
      {products && products.length === 0 && (
        <h3>
          No posts yet, add one <a href="/sell"> now</a> to sell your agro
          products.
        </h3>
      )}
      {products && products.length !== 0 && (
        <div className="search__rem">
          {products.map((product) => (
            <SearchProductItem key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="search__rer"></div>
    </div>
  );
};

export default Mysells;
