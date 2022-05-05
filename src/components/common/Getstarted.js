import React from 'react';

const Getstarted = () => {
  return (
    //   div
    <div class="mx-auto border shadow-md bg-white rounded-lgdark:bg-gray-800  flex justify-center items-center p-4 dark:bg-gray-800">
      <div class="p-8  text-center">
        <div className="mb-4">
          <h5 class="mb-2 text-3xl font-bold tracking-tight text-gray-700 dark:text-white">
            GET STARTED
          </h5>
          <p class="mb-3 font-semibold text-gray-600 dark:text-gray-400">
            We open the door to thousands of approved buyers and sellers. Post
            your crop bid as a registered buyer, or create your crop offer as a
            platform verified seller. Through our rigorous customer compliance
            we make sure that only reliable users gain access to our digital
            marketplace. There are two ways to get started:
          </p>
        </div>

        <div className="flex justify-between items-center p-4 my-2">
          <div>
            <a href="#login-form">
              <h5 class="mb-2 text-2xl font-bold tracking-tight dark:text-white text-green-600">
                Post offer as a seller
              </h5>
            </a>
            <p class="mb-3 font-semibold text-gray-600 dark:text-gray-400">
              As a seller, post offers for the agricultural crop you are looking
              to sell, and gain immediate access to credit-verified buyers. Or
              simply react to an existing buyer’s bid and start your
              transaction.
            </p>
            <a
              href="#login-form"
              class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Join Now as Seller
            </a>
          </div>
          <div>
            <a href="#login-form">
              <h5 class="mb-2 text-2xl font-bold tracking-tight dark:text-white text-green-600">
                Post bid as a buyer
              </h5>
            </a>
            <p class="mb-3 font-semibold text-gray-600 dark:text-gray-400">
              As a buyer, post bids for the agricultural crop you are looking to
              buy. Communicate to the market what you are looking for, and get
              rapid reactions from interested farmers or sellers.
            </p>
            <a
              href="#login-form"
              class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Join Now as Buyer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Getstarted;
