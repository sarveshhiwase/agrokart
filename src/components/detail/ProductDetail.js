import { useState, useEffect, useContext, useRef } from 'react';
// import { useHistory } from 'react-router';
// import * as routeService from '../../services/route';
import * as storageService from '../../services/storage';
// import * as wishlistService from '../../services/wishlist';
import firebase from 'firebase';
import { Context } from '../../context/AppContext';

// import * as ROUTES from '../../constants/routes';
import * as STORAGE_KEYS from '../../constants/storage-keys';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [isloading, setLoading] = useState(false);
  const priceRef = useRef(null);
  const productDescriptionRef = useRef(null);
  // const history = useHistory();
  const { user } = useContext(Context);

  useEffect(() => {
    const product = JSON.parse(storageService.get(STORAGE_KEYS.PRODUCT));

    const isAlreadyInterested = () => {
      if (
        product.interested !== null &&
        product.interested !== undefined &&
        user !== null &&
        user !== undefined
      ) {
        const idx = product.interested.find((iuser) => {
          if (iuser && iuser.user && iuser.user === user.id) {
            return true;
          }
          return false;
        });
        if (idx) {
          setLoading(true);
        }
      }
    };
    if (product) {
      setProduct(() => product);
      isAlreadyInterested();
    }
  }, [user]);

  const addToWishlist = async () => {
    if (!priceRef.current.value || !productDescriptionRef.current.value) {
      alert('Please add a price and description');
      return;
    }
    const productRef = firebase.database().ref('products').child(product.id);
    if (!product.interested) {
      product.interested = [];
    }
    productRef.update({
      interested: [
        {
          user: user.id,
          price: priceRef.current.value,
          description: productDescriptionRef.current.value,
        },
        ...product.interested,
      ],
    });
    setLoading(true);
    // wishlistService.addToWishlist(product);
  };

  // const chatWithSeller = () => {
  //   storageService.save({
  //     key: STORAGE_KEYS.SELLER,
  //     payload: product.createdBy,
  //   });
  //   routeService.navigate({ route: ROUTES.SELLER, push: history.push });
  // };

  if (!product) return <></>;

  return (
    <>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <img
          className="p-8 rounded-t-lg"
          src={product.image}
          alt={product.name}
        />
        <div className="px-5 pb-5">
          <h5 className="text-xl my-1 font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h5>
          <p className="text-lg my-2 font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.description}
          </p>
          {!isloading && (
            <div className="p-4">
              <label
                htmlFor="email-address-icon"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Price
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span>&#36;</span>
                </div>
                <input
                  type="number"
                  id="email-address-icon"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  ref={priceRef}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="large-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Description
                </label>
                <textarea
                  ref={productDescriptionRef}
                  type="text"
                  id="large-input"
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
          )}
          {/* <div className="flex items-center mt-2.5 mb-5">
            <svg
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
              5.0
            </span>
          </div> */}
          <div className="flex justify-between items-center">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ${product.price}
            </span>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
              disabled:bg-blue-300/90 dark:disabled:bg-blue-300/60
              cursor-not-allowed
              "
              onClick={addToWishlist}
              disabled={isloading}
            >
              {isloading ? 'Response already sent to seller' : 'Interested'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
