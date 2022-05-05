import React from 'react';
import processValue from '../../images/process.gif';

const Value = () => {
  return (
    <div className="bg-white dark:bg-white p-4 rounded-b-lg dark:border-gray-700">
      <div class="  mx-auto w-3/5 dark:bg-gray-800 dark:border-gray-700 ">
        <img
          class="w-full h-full object-contain "
          src={processValue}
          alt="Process of agrokart"
        />
        <div class="p-5 border">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Agrokart Value Proposition
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Agrokart accommodates direct communication between buyers and
            sellers. All intermediate supply chain stages are covered by buyers
            and sellers themselves.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Value;
