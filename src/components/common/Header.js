import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../../context/AppContext';

import withModal from '../../components/common/Modal';
import Sell from '../../components/sell/Sell';

import * as routeService from '../../services/route';
import * as ROUTE from '../../constants/routes';
import NavbarIcon from './NavbarIcon';
import { RiMessage2Fill } from 'react-icons/ri';
import { GiSellCard } from 'react-icons/gi';
import { FaSellsy } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import useDarkMode from '../Darkmode';

const Header = ({ toggleModal }) => {
  const { user, setUser, cometChat } = useContext(Context);
  const [darkMode, setDarkMode] = useDarkMode();
  const history = useHistory();

  const chat = () => {
    routeService.navigate({ route: ROUTE.CHAT, push: history.push });
  };

  const sell = () => {
    routeService.navigate({ route: ROUTE.SELL, push: history.push });
    // toggleModal(true);
  };

  const mysells = () => {
    routeService.navigate({ route: ROUTE.MYSELL, push: history.push });
  };

  const myprofile = () => {
    routeService.navigate({ route: ROUTE.MYPROFILE, push: history.push });
  };

  const home = () => {
    routeService.navigate({ route: ROUTE.HOME, push: history.push });
  };

  const logout = async () => {
    const isLogout = window.confirm('Do you want to log out ?');
    if (isLogout) {
      await logoutCometChat();
      removeAuthedInfo();
      routeService.navigate({ route: ROUTE.HOME, push: history.push });
    }
  };

  const logoutCometChat = async () => {
    await cometChat.logout();
  };

  const removeAuthedInfo = () => {
    setUser(null);
    localStorage.removeItem('auth');
  };

  if (!user) return <></>;

  return (
    <>
      <nav className=" bg-white border-gray-200 px-2 sm:px-4 py-2 rounded dark:bg-gray-800">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <div onClick={home} href="/" className="flex items-center">
            <img
              src="/agrokart_Icon.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Agrokart
            </span>
          </div>

          <div className="justify-between items-center w-full md:flex md:w-auto md:order-1">
            <ul className="flex justify-between mt-4  md:flex-row md:space-x-8 md:mt-0 md:mr-4 md:text-sm md:font-medium">
              <li>
                <NavbarIcon
                  icon={<RiMessage2Fill className="w-6 h-6" />}
                  text="Chat with others"
                  click={chat}
                />
              </li>
              <li>
                <NavbarIcon
                  icon={<GiSellCard className="w-6 h-6" />}
                  text="Sell your product"
                  click={sell}
                />
              </li>
              <li>
                <NavbarIcon
                  icon={<FaSellsy className="w-6 h-6" />}
                  text="Your selled products"
                  click={mysells}
                />
              </li>

              <li>
                <NavbarIcon
                  click={logout}
                  icon={<FiLogOut className="w-6 h-6" />}
                  text="Logout"
                />
              </li>
              <li>
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
              </li>
              <li>
                <NavbarIcon
                  click={myprofile}
                  icon={
                    <img
                      className="w-8 h-8 rounded-full object-contain"
                      src={user.avatar}
                      alt="profile pic"
                    />
                  }
                  text="Your Profile"
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* <div className="flex justify-between items-center p-1">
        <div>
          {user && (
            <div className="flex gap-2 items-center">
              <div className="border-2 border-green-400 rounded-lg p-1">
                <img src={user.avatar} className="w-12 h-12" alt={user.email} />
              </div>
              <span>Hello, {user.fullname}</span>
            </div>
          )}
        </div>
        <div className="header__actions">
          <span className="header__action-title" onClick={chat}>
            <span>Chat</span>
          </span>
          <span className="header__action-title" onClick={myprofile}>
            <span>My Profile</span>
          </span>
          <span className="header__action-title" onClick={sell}>
            <span>Sell</span>
          </span>
          <span className="header__action-title" onClick={mysells}>
            <span>MySells</span>
          </span>
          <span className="header__action-title" onClick={wishlist}>
            <span>Wishlist</span>
          </span>
          <span className="header__action-title" onClick={logout}>
            <span>Logout</span>
          </span>
        </div>
      </div> */}
    </>
  );
};

export default withModal(Sell)(Header);
