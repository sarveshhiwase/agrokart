import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as routeService from '../../services/route';
import * as storageService from '../../services/storage';
// import { Context } from '../../context/AppContext';

import * as STORAGE_KEYS from '../../constants/storage-keys';
import * as ROUTES from '../../constants/routes';
import firebase from 'firebase';

const InterestedBuyers = ({ user }) => {
  const [interestedUser, setUser] = useState(null);

  const history = useHistory();

  const chatWithBuyer = () => {
    storageService.save({
      key: STORAGE_KEYS.SELLER,
      payload: user.user,
    });
    routeService.navigate({ route: ROUTES.SELLER, push: history.push });
  };

  useEffect(() => {
    const idbuser = firebase.database().ref('users').child(user.user);
    idbuser.on('value', (snapshot) => {
      setUser(snapshot.val());
    });
  }, [user.user]);

  return (
    <>
      {interestedUser && (
        <>
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <img
                class="w-8 h-8 rounded-full"
                src={interestedUser.avatar}
                alt="Neil"
              />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                {interestedUser.fullname}
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                {interestedUser.email}
              </p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              ${user.price}
            </div>
          </div>
          <div className="mt-2">
            <h6 class=" text-base font-semibold text-gray-800 dark:text-white">
              {user.description}
            </h6>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
              disabled:bg-blue-400"
              onClick={chatWithBuyer}
            >
              Chat with buyer
            </button>
          </div>
        </>
      )}
    </>
    // <div className="interested-user-section">
    //   {interestedUser && (
    //     <>
    //       <img
    //         className="interesed-user-pic"
    //         src={interestedUser.avatar}
    //         alt={`avatar of ${interestedUser.fullname}`}
    //       />
    //       <h3>{interestedUser.fullname}</h3>
    //       <button onClick={chatWithBuyer}>Chat with buyer</button>
    //       <p>Only chat if you are interested...</p>
    //     </>
    //   )}
    // </div>
  );
};

export default InterestedBuyers;
