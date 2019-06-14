import React from 'react';
import { Router, Route, Switch, Link } from 'dva/router';
import CustomerPage from './routes/CustomerPage/CustomerPage';
import CommentPage from './routes/CommentPage/CommentPage';
import OrderPage from './routes/OrderPage/OrderPage';
import ProductPage from './routes/ProductPage/ProductPage';
import CategoryPage from './routes/CategoryPage/CategoryPage';
import WaiterPage from './routes/WaiterPage/WaiterPage';
import LoginPage from './routes/LoginPage/LoginPage';
import AddressPage from './routes/AddressPage/AddressPage';
import IndexPage from './routes/IndexPage/IndexPage';
import styles from './router.css'
//import newIndexPage from './routes/IndexPage/newIndexPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <div className={styles.container}>
          <div className={styles["left-nav"]}>
            <div className={styles.title}>E洁家政管理系统</div>
            <ul>
              <li className={styles["nav-list-item"]}><Link to="/customer">顾客管理</Link></li>
              <li className={styles["nav-list-item"]}><Link to="/order">订单管理</Link></li>
              <li className={styles["nav-list-item"]}><Link to="/address">地址管理</Link></li>
              <li className={styles["nav-list-item"]}><Link to="/comment">评论管理</Link></li>
              <li className={styles["nav-list-item"]}><Link to="/product">产品管理</Link></li>
              <li className={styles["nav-list-item"]}><Link to="/category">分类管理</Link></li>
              <li className={styles["nav-list-item"]}><Link to="/waiter">服务员管理</Link></li>
            </ul>
          </div>

          <div className={styles["right-content"]}>
            <Switch>
              <Route path="/" exact component={IndexPage} />
              <Route path="/customer" exact component={CustomerPage} />
              <Route path="/order" exact component={OrderPage} />
              <Route path="/address" exact component={AddressPage} />
              <Route path = "/comment" exact component = {CommentPage} />
              <Route path = "/product" exact component = {ProductPage} />
              <Route path = "/category" exact component = {CategoryPage} />
              <Route path = "/waiter" exact component = {WaiterPage} />
            </Switch>
          </div>
        </div>
      {/* <Switch>
        <Route path = "/login" exact component ={LoginPage} />
      </Switch> */}
    </Router>
  );
}

export default RouterConfig;
