import { useRef, useContext } from 'react';
import { useHistory } from 'react-router';

import { Context } from '../../context/AppContext';

import * as routeService from '../../services/route';
import * as storageService from '../../services/storage';

import * as ROUTE from '../../constants/routes';
import * as STORAGE_KEYS from '../../constants/storage-keys';

// import arrow from '../../images/arrow.svg';
import search from '../../images/search.png';

const Search = () => {
  const searchRef = useRef(null);

  const { user } = useContext(Context);

  const history = useHistory();

  const home = () => {
    routeService.navigate({ route: ROUTE.HOME, push: history.push });
  };

  const searchProducts = (e) => {
    e.preventDefault();
    const keywords = searchRef.current.value;
    if (keywords) {
      storageService.save({ key: STORAGE_KEYS.KEYWORD, payload: keywords });
      searchOrReload();
      searchRef.current.value = '';
    }
  };

  const searchOrReload = () => {
    const url = window.location.href;
    if (url.includes(ROUTE.SEARCH)) {
      window.location.reload();
    } else {
      routeService.navigate({ route: ROUTE.SEARCH, push: history.push });
    }
  };

  if (!user) return <></>;

  return (
    <div>
      <div className="p-4">
        <form className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-300 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              ref={searchRef}
              required
            />
          </div>
          <button
            type="submit"
            onClick={searchProducts}
            className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
