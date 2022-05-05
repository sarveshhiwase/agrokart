import { useEffect, useRef, useContext } from 'react';
import validator from 'validator';
import { useHistory } from 'react-router-dom';

import withModal from '../common/Modal';
import SignUp from '../register/SignUp';

import { Context } from '../../context/AppContext';

import * as cometChatService from '../../services/cometchat';
import * as firebaseService from '../../services/firebase';
import * as routeService from '../../services/route';
import * as storageService from '../../services/storage';
import * as uiService from '../../services/ui';

import * as FIREBASE_KEYS from '../../constants/firebase-keys';
import * as ROUTES from '../../constants/routes';
import * as STORAGE_KEYS from '../../constants/storage-keys';

// import firebase from 'firebase/app';
import 'firebase/auth';
import NavbarIcon from '../common/NavbarIcon';
import useDarkMode from '../Darkmode';

const Login = (props) => {
  const { toggleModal } = props;
  const [darkMode, setDarkMode] = useDarkMode();

  const { cometChat, setUser } = useContext(Context);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const history = useHistory();

  // const signInWithGoogle = () => {
  //   const auth = firebase.auth();
  //   const googleProvider = new firebase.auth.GoogleAuthProvider();
  //   auth
  //     .signInWithPopup(googleProvider)
  //     .then((res) => {
  //       console.log(res.user);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };

  useEffect(() => {
    const authedUser = JSON.parse(storageService.get(STORAGE_KEYS.AUTH));
    // console.log(authedUser);
    if (authedUser) {
      routeService.navigate({ route: ROUTES.HOME, push: history.push });
    } else {
      setUser(null);
    }
  }, [history, setUser]);

  const login = async (e) => {
    e.preventDefault();
    try {
      uiService.showLoading();
      const { email, password } = getInputs();
      if (!email || !password) {
        alert('Enter email and password');
      }
      if (isUserCredentialsValid(email, password)) {
        await firebaseService.login(email, password);
        const user = await firebaseService.getData({
          key: FIREBASE_KEYS.USERS,
          query: FIREBASE_KEYS.EMAIL,
          criteria: email,
        });
        await cometChatService.login({ cometChat, user });
        if (user) saveAuthedInfo(user);
        else {
          removeAuthInfo();
          throw Error('User not found');
        }
        uiService.hideLoading();
        routeService.navigate({ route: ROUTES.HOME, push: history.push });
      } else {
        uiService.hideLoading();
        uiService.alert(`Your user's name or password is not correct`);
      }
    } catch (error) {
      console.log(error);
      uiService.hideLoading();
    }
  };

  const getInputs = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    return { email, password };
  };

  const isUserCredentialsValid = (email, password) => {
    return validator.isEmail(email) && password;
  };

  const saveAuthedInfo = (user) => {
    setUser(user);
    storageService.save({
      key: STORAGE_KEYS.AUTH,
      payload: JSON.stringify(user),
    });
  };

  const removeAuthInfo = () => {
    storageService.remove({
      key: STORAGE_KEYS.AUTH,
    });
  };

  return (
    <>
      <nav class="bg-[inherit] border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
          <a href="/" class="flex items-center">
            <img
              src="/agrokart_Icon.svg"
              class="mr-3 h-6 sm:h-9"
              alt="Agrokart Logo"
            />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Agrokart
            </span>
          </a>
          <div class="flex md:order-2">
            <a
              href="#login-form"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Join Now
            </a>
            <NavbarIcon
              icon={
                darkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`h-8 w-8`}
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )
              }
              click={() => setDarkMode(!darkMode)}
              text="Dark Mode"
            />
          </div>
          <div
            class=" justify-between items-center w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-4"
          >
            <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <h3
                  href="#"
                  class="text-lg md:hover:text-blue-700 font-extrabold block py-2 pr-4 pl-3  rounded md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </h3>
              </li>
              <li>
                <h3
                  href="#"
                  class="text-lg font-extrabold block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </h3>
              </li>

              <li>
                <h3
                  href="#"
                  class="text-lg font-extrabold block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </h3>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className=" homepage-banner relative shadow-xl">
        <div className="w-full h-full absolute flex flex-col items-center justify-center">
          <h1 className="text-3xl font-extrabold text-white p-2">
            All agriculture problems solution in one place.
          </h1>
          <p className="text-2xl font-bold text-white">
            {' '}
            Where You meet your perfect{' '}
            <span className="text-green-500">Seller</span> and{' '}
            <span className="text-green-500">Buyer</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row justify-around items-center py-8 px-4">
        <div className="w-full md:w-1/2 my-4 md:my-0 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <img src="/agrokart_Icon.svg" className="w-24 h-24" alt="logo" />
            <p className="text-2xl font-semibold text-center text-gray-600">
              All agriculture problems{' '}
              <span style={{ color: '#3565F2', fontWeight: 'bold' }}>
                solution
              </span>{' '}
              in one place!
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex  justify-center items-center">
          <form
            id="login-form"
            className="w-96 p-4 md:p-4 shadow-xl rounded-lg dark:bg-gray-700 bg-[#fff]"
          >
            <h3 className="text-2xl p-2 mb-2 text-center text-blue-600 font-bold">
              Join Agrokart Now!
            </h3>
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
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ref={passwordRef}
                required
              />
            </div>
            <div className="mx-auto w-full">
              <button
                type="submit"
                class="text-white w-auto md:w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700  dark:focus:ring-blue-800"
                onClick={login}
              >
                Login
              </button>
              <span
                type="button"
                class="text-blue-600 font-bold cursor-pointer underline  underline-offset-8 decoration-sky-500   w-auto md:w-full focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm my-1 px-5 py-2 text-center   dark:focus:ring-blue-800"
                onClick={() => toggleModal(true)}
              >
                Create an account now.
              </span>
            </div>
          </form>
          {/* <div className="login__form " id="login-form">
            <input
              type="text"
              placeholder="Email or phone number"
              ref={emailRef}
            />
            <input type="password" placeholder="Password" ref={passwordRef} />
            <button className="login__submit-btn" onClick={login}>
              Login
            </button>
            <span className="login__forgot-password">Forgot password?</span>
            <span className="login__signup" onClick={() => toggleModal(true)}>
              Create New Account
            </span>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default withModal(SignUp)(Login);
