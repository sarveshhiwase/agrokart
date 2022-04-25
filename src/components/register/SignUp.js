import { useRef, useContext } from 'react';
import validator from 'validator';
import { v4 as uuidv4 } from 'uuid';

import { Context } from '../../context/AppContext';

import * as cometChatService from '../../services/cometchat';
import * as firebaseService from '../../services/firebase';
import * as uiService from '../../services/ui';

import * as FIREBASE_KEYS from '../../constants/firebase-keys';

const SignUp = (props) => {
  const { toggleModal } = props;

  const fullnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const profilepicRef = useRef(null);

  const { cometChat } = useContext(Context);

  const signup = async () => {
    try {
      const { fullname, email, password, confirmPassword, profilepic } =
        getInputs();
      if (isSignupValid({ fullname, email, password, confirmPassword })) {
        const id = uuidv4();
        let avatar = profilepic;
        if (!profilepic) {
          avatar = generateAvatar();
        }
        const createdAccount = { id, fullname, email, avatar };
        uiService.showLoading();
        await firebaseService.createAccount(email, password);
        await firebaseService.insert({
          key: FIREBASE_KEYS.USERS,
          id,
          payload: createdAccount,
        });
        await cometChatService.createAccount({
          cometChat,
          id,
          fullname,
          avatar,
        });
        uiService.hideLoading();
        uiService.alert(
          `${email} was created successfully! Please sign in with your created account`
        );
        toggleModal(false);
      } else {
        uiService.hideLoading();
        uiService.alert(
          `Cannot create your account, ${email} might be existed, please try again!`
        );
      }
    } catch (error) {
      uiService.hideLoading();
    }
  };

  const getInputs = () => {
    const fullname = fullnameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const profilepic = profilepicRef.current.value;
    return { fullname, email, password, confirmPassword, profilepic };
  };

  const isSignupValid = ({ fullname, email, password, confirmPassword }) => {
    if (validator.isEmpty(fullname)) {
      uiService.alert('Please input your fullname');
      return false;
    }
    if (!validator.isEmail(email)) {
      uiService.alert('Please input your email');
      return false;
    }
    if (
      validator.isEmpty(password) ||
      !validator.isLength(password, { min: 6 })
    ) {
      uiService.alert(
        'Please input your password. You password must have at least 6 characters'
      );
      return false;
    }
    if (validator.isEmpty(confirmPassword)) {
      uiService.alert('Please input your confirm password');
      return false;
    }
    if (password !== confirmPassword) {
      uiService.alert('Confirm password and password must be the same');
      return false;
    }
    return true;
  };

  const generateAvatar = () => {
    const avatars = [
      'https://cdn-icons-png.flaticon.com/512/206/206865.png',
      'https://cdn-icons.flaticon.com/png/512/3445/premium/3445119.png?token=exp=1650864751~hmac=e75f6642233058260353498e7978c419',
      'https://cdn-icons-png.flaticon.com/512/3319/3319221.png',
    ];
    const avatarPosition = Math.floor(Math.random() * avatars.length);
    return avatars[avatarPosition];
  };

  return (
    <div className="signup">
      <div className="signup__content">
        <div className="signup__container">
          <div className="signup__title">Sign Up</div>
          <div className="signup__close">
            <img
              alt="close"
              onClick={() => toggleModal(false)}
              src="https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/__geKiQnSG-.png"
            />
          </div>
        </div>
        <div className="signup__subtitle"></div>
        <div className="signup__form">
          <input type="text" placeholder="Fullname" ref={fullnameRef} />
          <input type="text" placeholder="Email" ref={emailRef} />
          <input type="password" placeholder="Password" ref={passwordRef} />
          <input
            type="password"
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
          />
          <input
            type="file"
            placeholder="Upload a profile picture"
            ref={profilepicRef}
          />
          <button className="signup__btn" onClick={signup}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;