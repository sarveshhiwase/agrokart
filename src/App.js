import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AppContext } from './context/AppContext';
// import Cart from './components/cart/Cart';
import Chat from './components/chat/Chat';
import ChatWithSeller from './components/chat/ChatWithSeller';
import Header from './components/common/Header';
import Home from './components/home/Home';
import Loading from './components/common/Loading';
import Login from './components/login/Login';
import Menu from './components/menu/Menu';
import PrivateRoute from './components/common/PrivateRoute';
import ProductDetail from './components/detail/ProductDetail';
import Search from './components/search/Search';
import SearchProducts from './components/search/SearchProducts';
import Wishlist from './components/wishlist/Wishlist';

import './index.css';
import Sell from './components/sell/Sell';
import Mysells from './components/mysells/Mysells';
import Profile from './components/profile/Profile';

function App() {
  return (
    <AppContext>
      <Router>
        <Header />
        <Search />
        <Menu />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/myprofile" component={Profile} />
          <PrivateRoute exact path="/chat" component={Chat} />
          <PrivateRoute exact path="/seller" component={ChatWithSeller} />
          <PrivateRoute exact path="/search" component={SearchProducts} />
          <PrivateRoute exact path="/detail" component={ProductDetail} />
          <PrivateRoute exact path="/sell" component={Sell} />
          <PrivateRoute exact path="/mysells" component={Mysells} />
          <PrivateRoute exact path="/wishlist" component={Wishlist} />
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
      <Loading />
    </AppContext>
  );
}

export default App;
