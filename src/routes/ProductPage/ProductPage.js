import React from 'react';
import styles from './ProductPage.css';
import axios from '../utils/axios'
import {Table,Button,Menu, Dropdown, Icon} from 'antd'


class ProductPage extends React.Component {

  constructor(){
    super();
    this.state = {
      list:[],
      loading:false
    }
}


//生命周期函数，组件绑定时执行
componentDidMount(){
    this.reloadData();
}

//加载数据
reloadData(){
  this.setState({loading:true});
    axios.get("/product/findAll")
    .then((result)=>{
      this.setState({list:result.data})
    })
    .finally(()=>{
        this.setState({loading:false});
    })
}

  render(){
    let columns = [{
      title:"产品序列",
      dataIndex:"id"
  },{
      title:"服务名称",
      dataIndex:"name"
  },{
      title:"详情",
      dataIndex:"gender"
  },{
      title:"价格",
      dataIndex:"price"
  },{
      title:"状态",
      dataIndex:"status"
  },{
      title:"服务概览",
      dataIndex:"photo"
  },{
      title:"服务人员",
     dataIndex:"category_id"
  }]

  const { SubMenu } = Menu;
  let menu = (
  <Menu>

    <SubMenu title="一级分类">
      <SubMenu title="二级分类">
      <Menu.Item>三级分类</Menu.Item>
      </SubMenu>
    </SubMenu>

  </Menu>
);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      this.setState({
        ids:selectedRowKeys
      })
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', 
      name: record.name,
    }),
  };


    return (
      <div className={styles.product}>
      <div className={styles.title}>产品管理</div>
      <div>
        <Dropdown overlay={menu}>
          <Button>
            服务类型 <Icon type="down" />
          </Button>
        </Dropdown> &nbsp;
        <Button type="primary">选择服务</Button>
      </div>
      <br/>
      <Table 
          bordered
          rowKey="id"
          size="small"
          loading={this.state.loading}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.list}/>
    </div>
  )
  }
}


export default ProductPage;
