import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';
import InterestedBuyers from './InterestedBuyers';

const SellerPostDetails = () => {
  const [product, setProduct] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    const dbproduct = firebase.database().ref('products').child(id);
    dbproduct.on('value', (snapshot) => {
      setProduct(snapshot.val());
    });
  }, [id]);
  return (
    <>
      {product !== null && (
        <div className="min-h-screen">
          <div class="flex mx-auto flex-col items-center bg-white rounded-lg border shadow-md w-full md:min-w-max p-4 md:p-8 dark:border-gray-700 dark:bg-gray-800 ">
            <img
              class="object-cover w-full sm:w-48 sm:h-48 md:h-96  md:w-96  rounded-lg"
              src={product.image}
              alt=""
            />
            <div class="flex flex-col justify-between leading-normal p-2 my-2">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {product.name}
              </h5>
              <h6 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                ${product.price}
              </h6>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {product.description}
              </p>
            </div>
            {product.interested != null && product.interested.length !== 0 && (
              <div class=" max-w-md bg-white rounded-lg border shadow-md p-4 md:p-8 dark:bg-gray-800 dark:border-gray-700 ">
                <div class="flex justify-between items-center mb-4">
                  <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Latest Bidders
                  </h5>
                </div>
                <div class="flow-root">
                  <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                    {product.interested.map((user) => (
                      <li class="py-3 sm:py-4">
                        <InterestedBuyers key={user.user} user={user} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {(product.interested === null ||
              product.interested === undefined ||
              product.interested.length === 0) && (
              <div class="flex justify-between items-center mb-4">
                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  No bidders to show currently.
                </h5>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SellerPostDetails;
