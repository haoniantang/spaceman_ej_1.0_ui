import React from 'react';
import styles from './ProductPage.css';
import axios from '../utils/axios'
import {Table,Button} from 'antd'

class ProductPage extends React.Component {

  constructor(){
    super();
    this.state = {
      ids:[], // 批量删除的时候保存的id
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
    axios.get("/ej_product/findAll")
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
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // 当用户操作复选按钮的时候，将值获取到并且保存到state中
      this.setState({
        ids:selectedRowKeys
      })
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

    return (
      <div className={styles.product}>
      <div className={styles.title}>产品管理</div>
      <div>
          <Button type="primary">查看服务</Button> &nbsp;
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
