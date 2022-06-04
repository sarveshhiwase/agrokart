import { useState, useEffect, useContext, useRef } from 'react';
import * as storageService from '../../services/storage';
import firebase from 'firebase';
import { Context } from '../../context/AppContext';
import { FaSpinner } from 'react-icons/fa';
import * as STORAGE_KEYS from '../../constants/storage-keys';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [isloading, setLoading] = useState(true);
  const [isInterested, setInterested] = useState(false);
  const priceRef = useRef(null);
  const productDescriptionRef = useRef(null);
  const { user } = useContext(Context);

  useEffect(() => {
    let product = JSON.parse(storageService.get(STORAGE_KEYS.PRODUCT));

    if (product) {
      firebase
        .database()
        .ref('products')
        .child(product.id)
        .on('value', (record) => {
          const recordval = record.val();
          if (product) product = recordval;
          if (
            recordval.interested !== null &&
            recordval.interested !== undefined &&
            user !== null &&
            user !== undefined
          ) {
            const idx = recordval.interested.find((iuser) => {
              if (iuser && iuser.user && iuser.user === user.id) {
                return true;
              }
              return false;
            });
            if (idx) {
              setInterested(true);
            }
          }
          setProduct(product);
          setLoading(false);
        });
    }
  }, [user]);

  const addToWishlist = async () => {
    if (!priceRef.current.value || !productDescriptionRef.current.value) {
      alert('Please add a price and description');
      return;
    }
    setLoading(true);

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
    setLoading(false);
  };

  if (!product)
    return (
      <div className="min-h-screen text-center">
        {isloading && (
          <h1 className="text-3xl text-center flex justify-center">
            <FaSpinner className="animate-spin" />
          </h1>
        )}
        {!isloading && (
          <h5 className="text-xl my-1 font-semibold tracking-tight text-gray-900 dark:text-white">
            Please try again Later.
          </h5>
        )}
      </div>
    );

  return (
    <div className="min-h-screen">
      {isloading && (
        <h1 className="text-center text-3xl flex justify-center">
          <FaSpinner className="animate-spin" />
        </h1>
      )}
      {!isloading && (
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
            {!isInterested && (
              <div className="p-4">
                <label
                  htmlFor="email-address-icon"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-900 dark:text-white">₹</span>
                  </div>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your bid price."
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
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your description for your bid"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ₹{product.price}
              </span>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
              disabled:bg-blue-300/90 dark:disabled:bg-blue-300/60
              disabled:cursor-not-allowed
              "
                onClick={isInterested ? null : addToWishlist}
                disabled={isInterested}
              >
                {isInterested
                  ? 'Response already sent to seller'
                  : 'Interested'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
