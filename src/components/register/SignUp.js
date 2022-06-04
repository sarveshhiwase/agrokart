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

  const { cometChat } = useContext(Context);

  const signup = async (e) => {
    e.preventDefault();
    try {
      const { fullname, email, password, confirmPassword } = getInputs();
      if (isSignupValid({ fullname, email, password, confirmPassword })) {
        const id = uuidv4();
        let avatar = generateAvatar();
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
      console.log(error);
      uiService.hideLoading();
      uiService.alert(
        `Cannot create your account, email might be existed, please try again!`
      );
    }
  };

  const getInputs = () => {
    const fullname = fullnameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    return { fullname, email, password, confirmPassword };
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
      'https://cdn-icons-png.flaticon.com/512/3319/3319221.png',
    ];
    const avatarPosition = Math.floor(Math.random() * avatars.length);
    return avatars[avatarPosition];
  };

  return (
    <div className="fixed left-0 top-0 w-full min-h-screen  flex justify-center items-center dark:bg-gray-800 bg-gray-200">
      <form className="p-8 rounded-lg shadow-lg dark:bg-gray-900 bg-white">
        <div class="flex justify-between items-center gap-2 px-4 py-4 rounded-t  dark:border-gray-600 mb-2">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Sign Up for Agrokart
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => toggleModal(false)}
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div class="mb-6">
          <label
            for="username"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your Username
          </label>
          <input
            type="text"
            id="username"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="John Doe"
            ref={fullnameRef}
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@gmail.com"
            ref={emailRef}
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password here"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            ref={passwordRef}
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="repeat-password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Confirm password
          </label>
          <input
            type="password"
            ref={confirmPasswordRef}
            placeholder="Confirm your password"
            id="repeat-password"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>

        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={signup}
        >
          Register new account
        </button>
      </form>
    </div>
  );
};

export default SignUp;
