import { useContext } from 'react';

import { Context } from '../../context/AppContext';

const Profile = () => {
  const { user } = useContext(Context);
  return (
    <div>
      {user && (
        <>
          {/* <div>
            <img src={user.avatar} alt={`profile of ${user.fullname}`} />
            <h4>{user.fullname}</h4>
            <h4>{user.email}</h4>
          </div> */}
          <div className="mx-auto max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex flex-col items-center pb-10">
              <img
                className="mb-3 w-24 h-24 rounded-full shadow-lg"
                src={user.avatar}
                alt={`${user.fullname} profile`}
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {user.fullname}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user.email}
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Edit Profile
                </button>
                {/* <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
                  Message
                </button> */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
