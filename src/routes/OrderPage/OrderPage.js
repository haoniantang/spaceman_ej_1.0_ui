import React from 'react';
// 引入css进行页面美化
import styles from './OrderPage.less'
// 导入组件
import {Modal,Button, Table,message} from 'antd'
import axios from '../../utils/axios'


// 组件类必须要继承React.Component，是一个模块，顾客管理子功能
class OrderPage extends React.Component {
  // 局部状态state
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
  // 批量删除
  handleBatchDelete(){
    Modal.confirm({
      title: '确定对这些订单进行删除吗?',
      //content: '删除后数据将无法恢复',
      onOk:() => {
        axios.post("/order/batchDeleteOrder",{ids:this.state.ids})
        .then((result)=>{
          //批量删除后重载数据
          message.success(result.statusText)
          this.reloadData();
        })
      }
    });
  }

  // 单个删除（设置status为0）
  handleDelete(id){
    Modal.confirm({
      title: '确定删除该订单吗?',
      // content: '删除后数据将无法恢复',
      onOk:() => {
        // 删除操作
        axios.get("/order/deleteOrderById",{
          params:{
            id:id
          }
        })
        .then((result)=>{
          // 删除成功后提醒消息，并且重载数据
          message.success(result.statusText);
          this.reloadData();
        })
      }
    });
  }

  // 单个恢复，设置status为1
  handleRecover(id){
    // Modal.confirm({
    //   title: '确定恢复这个订单吗?',
    //   // content: '删除后数据将无法恢复',
    //   onOk:() => {
    //     // 恢复操作

    //     axios.get("/waiter/recoverWaiterById",{
    //       params:{
    //         id:id
    //       }
    //     })
    //     .then((result)=>{
    //       // 恢复成功后提醒消息，并且重载数据
    //       message.success(result.statusText);
    //       this.reloadData();
    //     })
    //   }
    // });
  }

  // 取消按钮的事件处理函数
  handleCancel = () => {
    this.setState({ visible: false });
  };
  // 确认按钮的事件处理函数
  handleCreate = () => {
    // const form = this.formRef.props.form;
    // form.setFieldsValue({ status: "1"});
    // form.validateFields((err, values) => {
    //   if (err) {
    //     return;
    //   }
    //   // 表单校验完成后与后台通信进行保存
    //   axios.post("/order/saveOrUpdateOrder",values)
    //   .then((result)=>{
    //     message.success(result.statusText)
    //     // 重置表单
    //     form.resetFields();
    //     // 关闭模态框
    //     this.setState({ visible: false });
    //     this.reloadData();
    //   })
      
    // });
  };
  // 将子组件的引用在父组件中进行保存，方便后期调用
  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  // 去添加
  toAdd(){
    // 将默认值置空,模态框打开
    this.setState({waiter:{},visible:true})
  }
  // 去更新
  toEdit(record){
    // 更前先先把要更新的数据设置到state中
    this.setState({waiter:record})
    // 将record值绑定表单中
    this.setState({visible:true})
  }

  // 组件类务必要重写的方法，表示页面渲染
  render(){
    // 变量定义
    let columns = [{
      title:'订单号',
      dataIndex:'orderId'
    },{
      title:'顾客姓名',
      dataIndex:'customerName'
    }
    ,{
        title:'服务员姓名',
        dataIndex:'waiterName'
      },{
      title:'地址',
      align:"center",
      dataIndex:'address'
    },{
        title:'价格',
        align:"center",
        dataIndex:'total'
      },{
        title:'时间戳址',
        align:"center",
        dataIndex:'orderTime'
      },{
      title:'操作',
      width:180,
      align:"center",
      render:(text,record)=>{
        return (
          <div>
            <Button type='link' size="small" onClick={this.toEdit.bind(this,record)}>修改</Button>
            <Button type='link' size="small" onClick={this.handleDelete.bind(this,record.id)}>封号</Button>
            <Button type='link' size="small" onClick={this.handleRecover.bind(this,record.id)}>恢复</Button>
          </div>
        )
      }
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
    
    // 返回结果 jsx(js + xml)
    return (
      <div className={styles.OrderPage}>
        <div className={styles.title}>订单管理</div>
        <div className={styles.btns}>
          <Button onClick={this.toAdd.bind(this)}>添加</Button> &nbsp;
          <Button onClick={this.handleBatchDelete.bind(this)}>批量删除</Button> &nbsp;
          <Button type="link">导出</Button>
        </div>
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