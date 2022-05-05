import React from 'react';

const Keyfeatures = () => {
  return (
    <div className="border mx-auto p-8">
      <div className="text-center">
        <h5 class="mb-2 text-3xl font-bold tracking-tight text-gray-700 dark:text-white">
          KEY FEATURES
        </h5>
        <p class="mb-3 font-semibold text-gray-600 dark:text-gray-400">
          Discover how Agrokart can benefit you and your agriculture needs.
        </p>
      </div>
      <div className="flex gap-8 w-4/5  mx-auto ">
        <div>
          <div class="relative  p-4 w-48">
            <img
              class="w-36 h-36"
              src="https://agrimp.com/assets/flowcharts/oval-34100b9a6862e2b2bc37d7f9fd45c66f87e172b249eafc56dd83f822fa282d6d.png"
              alt="Oval"
            />
            <div className="absolute z-10 inset-0 top-10 left-10 w-full h-full">
              <img
                class="w-24 h-24"
                src="https://agrimp.com/assets/flowcharts/transparency-22c9e5d80505d72e6f7d60580801572f3c431ac6018d4b4099a42212da8c36c0.png"
                alt="Transparency"
              />
            </div>
          </div>
          <p class="mb-3 font-semibold text-gray-600 dark:text-gray-400">
            Transparency
          </p>
          <p class="mb-3 font-semibold text-gray-600 dark:text-gray-400">
            Direct transactions between sellers and buyers
          </p>
        </div>

        <div>
          <div class="relative  p-4 w-48">
            <img
              class="w-36 h-36"
              src="https://agrimp.com/assets/flowcharts/oval-34100b9a6862e2b2bc37d7f9fd45c66f87e172b249eafc56dd83f822fa282d6d.png"
              alt="Oval"
            />
            <div className="absolute z-10 inset-0 top-10 left-10 w-full h-full">
              <img
                class="w-24 h-24"
                src="https://agrimp.com/assets/flowcharts/fairtrade-6f557826462666cbfa5b8d3c411224993cdc7a506cd31ed6d243eb05bbc8bb96.png"
                alt="Transparency"
              />
            </div>
          </div>
          <p class="mb-3 font-semibold text-gray-600 dark:text-gray-400">
            Fair Trade
          </p>
          <p class="mb-3 font-semibold text-gray-600 dark:text-gray-400">
            Sellers find appropriate buyers that satisfies their needs.
          </p>
        </div>

        <div>
          <div class="relative  p-4 w-48">
            <img
              class="w-36 h-36"
              src="https://agrimp.com/assets/flowcharts/oval-34100b9a6862e2b2bc37d7f9fd45c66f87e172b249eafc56dd83f822fa282d6d.png"
              alt="Oval"
            />
            <div className="absolute z-10 inset-0 top-10 left-10 w-full h-full">
              <img
                class="w-24 h-24"
                src="https://agrimp.com/assets/flowcharts/userfriendly-62cf507c1c2ba82b4435688baca08b1fbc89796f803b09aefcbeb88a0b042773.png"
                alt="Transparency"
              />
            </div>
          </div>
          <p class="mb-3 font-semibold text-gray-600 dark:text-gray-400">
            Reliability
          </p>
          <p class="mb-3 font-semibold text-gray-600 dark:text-gray-400">
            Agrokart gives your reliable connection between buyers and sellers.
          </p>
        </div>

        <div>
          <div class="relative  p-4 w-48">
            <img
              class="w-36 h-36"
              src="https://agrimp.com/assets/flowcharts/oval-34100b9a6862e2b2bc37d7f9fd45c66f87e172b249eafc56dd83f822fa282d6d.png"
              alt="Oval"
            />
            <div className="absolute z-10 inset-0 top-10 left-10 w-full h-full">
              <img
                class="w-24 h-24"
                src="https://agrimp.com/assets/flowcharts/food_traceability-93d797d1b2749edf1b55836c3ae17f807503aa5ebe44a34b21cb0b4a17aa0e64.png"
                alt="Transparency"
              />
            </div>
          </div>
          <p class="mb-3 font-semibold text-gray-600 dark:text-gray-400">
            Fast & Secure
          </p>
          <p class="mb-3 font-semibold text-gray-600 dark:text-gray-400">
            Agrokart gives fast access to all the products, keeping your data
            secure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Keyfeatures;
