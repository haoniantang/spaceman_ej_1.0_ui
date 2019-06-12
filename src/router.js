import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ProductPage from './routes/ProductPage';
import test from './routes/test';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/product" exact component={ProductPage} />
        <Route path="/test" exact component={test} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
