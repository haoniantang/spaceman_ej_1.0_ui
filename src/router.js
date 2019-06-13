import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import CustomerPage from './routes/CustomerPage/CustomerPage';
import CommentPage from './routes/CommentPage/CommentPage';
import OrderPage from './routes/OrderPage/OrderPage';
import ProductPage from './routes/ProductPage/ProductPage';
import TypePage from './routes/TypePage/TypePage';
import WaiterPage from './routes/WaiterPage/WaiterPage';
import LoginPage from './routes/LoginPage/LoginPage';
import IndexPage from './routes/IndexPage/IndexPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path = "/" exact component = {IndexPage} />
        <Route path = "/customer" exact component = {CustomerPage} />
        <Route path = "/comment" exact component = {CommentPage} />
        <Route path = "/order" exact component = {OrderPage} />
        <Route path = "/product" exact component = {ProductPage} />
        <Route path = "/type" exact component = {TypePage} />
        <Route path = "/waiter" exact component = {WaiterPage} />
        <Route path = "/login" exact component ={LoginPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
