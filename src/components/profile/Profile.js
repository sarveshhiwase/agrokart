import { useContext } from 'react';

import { Context } from '../../context/AppContext';

const Profile = () => {
  const { user } = useContext(Context);
  return (
    <div>
      {user && (
        <>
          <div>
            <img src={user.avatar} alt={`profile of ${user.fullname}`} />
            <h4>{user.fullname}</h4>
            <h4>{user.email}</h4>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
