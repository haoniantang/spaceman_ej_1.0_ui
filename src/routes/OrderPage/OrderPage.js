import React from 'react';
import styles from './OrderPage.less'
import {Modal,Button, Table,message} from 'antd'
import axios from '../../utils/axios'

class OrderPage extends React.Component {

  constructor(){
    super();
    this.state = {
      ids:[], // 批量删除的时候保存的id
      list:[],
      loading:false,
      visible:false,
      waiter:{}
    }
  }
  // 在生命周期钩子函数中调用重载数据
  componentDidMount(){
    this.reloadData();
  }

  // 重载数据
  reloadData(){
    this.setState({loading:true});
    axios.get("/order/queryBasic")
    .then((result)=>{
      // 将查询数据更新到state中
      this.setState({list:result.data})
    })
    .finally(()=>{
      this.setState({loading:false});
    })
  }

  toDetails(record){
    console.log(record);
    this.props.history.push({
      pathname:"/Orderdetails",
      payload:record
    })
  }
  

  
  // 组件类务必要重写的方法，表示页面渲染
  render(){
    // 变量定义
    let columns = [{
      title:'订单号',
      align:"center",
      dataIndex:'orderId',
      width:"10%"
    },{
      title:'顾客姓名',
      align:"center",
      dataIndex:'customerName',
      width:"10%"
    }
    ,{
        title:'服务员姓名',
        align:"center",
        dataIndex:'waiterName',
        width:"10%"
      },{
      title:'地址',
      align:"center",
      dataIndex:'address',
      width:"32%"
    },{
        title:'价格',
        align:"center",
        dataIndex:'total',
        width:"10%"
      },{
        title:'时间',
        align:"center",
        dataIndex:'orderTime',
        width:"15%"
      }
      ,{
      title:'操作',
      align:"center",
      width:"15%",
      render:(text,record)=>{
        return (
          <div>
            <Button type='link' size="small" onClick={this.toDetails.bind(this,record)}>查看订单项</Button>
          </div>
        )
      }
    }
  ]
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
    
    // 返回结果 jsx(js + xml)
    return (
      <div className={styles.OrderPage}>
        <div className={styles.btns}>
          <Button type="link" className={styles.selSerBtn}>导出</Button>
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
{/* 
        <WaiterForm
          initData={this.state.waiter}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}/> */}
      </div>
    )
  }
}

export default OrderPage;