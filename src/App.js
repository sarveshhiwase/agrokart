import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AppContext } from './context/AppContext';
import Chat from './components/chat/Chat';
import ChatWithSeller from './components/chat/ChatWithSeller';
import Header from './components/common/Header';
import Home from './components/home/Home';
import Loading from './components/common/Loading';
import Login from './components/login/Login';
import PrivateRoute from './components/common/PrivateRoute';
import ProductDetail from './components/detail/ProductDetail';
import Search from './components/search/Search';
import SearchProducts from './components/search/SearchProducts';

import './index.css';
import Sell from './components/sell/Sell';
import Mysells from './components/mysells/Mysells';
import Profile from './components/profile/Profile';
import SellerPostDetails from './components/postdetails/SellerPostDetails';
import Footer from './components/common/Footer';
import Subscribe from './components/common/Subscribe';
import Value from './components/common/Value';
import Getstarted from './components/common/Getstarted';
import Keyfeatures from './components/common/Keyfeatures';

function App() {
  return (
    <AppContext>
      <Router>
        <Header />
        <Search />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/myprofile" component={Profile} />
          <PrivateRoute exact path="/chat" component={Chat} />
          <PrivateRoute exact path="/seller" component={ChatWithSeller} />
          <PrivateRoute exact path="/search" component={SearchProducts} />
          <PrivateRoute exact path="/detail" component={ProductDetail} />
          <PrivateRoute exact path="/sell" component={Sell} />
          <PrivateRoute exact path="/mysells" component={Mysells} />
          <PrivateRoute
            exact
            path="/postdetails/:id"
            component={SellerPostDetails}
          />
          <Route exact path="/login">
            <Login />
            <Getstarted />
            <Value />
            <Keyfeatures />
            <Subscribe />
            <Footer />
          </Route>
        </Switch>
      </Router>
      <Loading />
    </AppContext>
  );
}

export default App;
