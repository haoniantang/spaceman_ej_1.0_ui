import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import CustomerPage from './routes/CustomerPage/CustomerPage';
import CommentPage from './routes/CommentPage/CommentPage';
import OrderPage from './routes/OrderPage/OrderPage';
import ProductPage from './routes/ProductPage/ProductPage';
import CategoryPage from './routes/CategoryPage/CategoryPage';
import WaiterPage from './routes/WaiterPage/WaiterPage';
import LoginPage from './routes/LoginPage/LoginPage';
import IndexPage from './routes/IndexPage/IndexPage';
import CustomerDetails from './routes/CustomerPage/CustomerDetails';
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
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item>易洁家政后台管理系统</Menu.Item>
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
                title={
                  <span>
                    <Icon type="notification" />
                    订单相关
                  </span>
                }
              >
                <Menu.Item>
                  <a href="#/order" >查看订单</a>
                </Menu.Item>
                <Menu.Item>
                  <a href="#/comment" >评价管理</a>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="user" />
                    员工&用户
                  </span>
                }
              >
                <Menu.Item>
                  <a href="#/waiter">员工管理</a>
                </Menu.Item>
                <Menu.Item>
                  <a href="#/customer">用户管理</a>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>主页</Breadcrumb.Item>
              <Breadcrumb.Item>类别</Breadcrumb.Item>
              <Breadcrumb.Item>服务</Breadcrumb.Item>
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
                <Route path = "/customerdetails" exact component ={CustomerDetails} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
}

export default RouterConfig;