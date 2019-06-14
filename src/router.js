import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import CustomerPage from './routes/CustomerPage/CustomerPage';
import CommentPage from './routes/CommentPage/CommentPage';
import OrderPage from './routes/OrderPage/OrderPage';
import ProductPage from './routes/ProductPage/ProductPage';
import CategoryPage from './routes/CategoryPage/CategoryPage';
import WaiterPage from './routes/WaiterPage/WaiterPage';
import LoginPage from './routes/LoginPage/LoginPage';
import AddressPage from './routes/AddressPage/AddressPage';
import IndexPage from './routes/IndexPage/IndexPage';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Layout>
        <Header className="header">
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">.</Menu.Item>
            <Menu.Item key="2">.</Menu.Item>
            <Menu.Item key="3">.</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="laptop" />
                    产品
                  </span>
                }
              >
                <Menu.Item>
                  <a href="#/category">分类管理</a>
                </Menu.Item>
                <Menu.Item>
                  <a href="#/product">产品管理</a>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="notification" />
                    评价与地址
                  </span>
                }
              >
                <Menu.Item>
                  <a href="#/comment">评价管理</a>
                </Menu.Item>
                <Menu.Item>
                  <a href="#/address">地址管理</a>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="user" />
                    人员管理
                  </span>
                }
              >
                <Menu.Item>
                  <a href="#/waiter">工人管理</a>
                </Menu.Item>
                <Menu.Item>
                  <a href="#/customer">用户管理</a>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Switch>
                <Route path = "/" exact component = {IndexPage} />
                <Route path = "/customer" exact component = {CustomerPage} />
                <Route path = "/comment" exact component = {CommentPage} />
                <Route path = "/order" exact component = {OrderPage} />
                <Route path = "/product" exact component = {ProductPage} />
                <Route path = "/category" exact component = {CategoryPage} />
                <Route path = "/waiter" exact component = {WaiterPage} />
                <Route path = "/login" exact component ={LoginPage} />
                <Route path = "/address" exact component ={AddressPage} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
}

export default RouterConfig;