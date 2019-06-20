import React from 'react';
import styles from './ProductPage.less';
import axios from '../../utils/axios'
import {Modal ,Table,Button,Input,Form,message} from 'antd'
import ProductForm from './ProductForm'
const FormItem = Form.Item;

class ProductPage extends React.Component {

  constructor(){
    super();
    this.state = {
      ids:[],
      list:[],
      loading:false,
      visible:false,
      product:{}
    }
}


//生命周期函数，组件绑定时执行
componentDidMount(){
    this.reloadData();
}


//加载全部服务
reloadData(){
  this.setState({loading:true});
    axios.post("/product/findAllProduct")
    .then((result)=>{
      this.setState({list:result.data})
    })
    .finally(()=>{
        this.setState({loading:false});
    })
}
handleBatchDelete(){
  Modal.confirm({
    title: '确定删除这些记录吗?',
    content: '删除后数据将无法恢复',
    onOk:() => {
      axios.post("/product/deleteBathProduct",{ids:this.state.ids})
      .then((result)=>{
        //批量删除后重载数据
        message.success(result.statusText)
        this.reloadData();
      })
    }
  });
}
//单个删除
handleDelete(id){
  Modal.confirm({
    title: '确定删除这条记录吗?',
    content: '删除后数据将无法恢复',
    onOk:() => {
      // 删除操作
      axios.get("/product/deleteProductById",{
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
// 取消按钮的事件处理函数
handleCancel = () => {
  this.setState({ visible: false });
};
// 确认按钮的事件处理函数
handleCreate = () => {
  const form = this.formRef.props.form;
  form.validateFields((err, values) => {
    if (err) {
      return;
    }
    alert(JSON.stringify(values));
    // 表单校验完成后与后台通信进行保存
    axios.post("/product/updateProduct",values)
    .then((result)=>{
      message.success(result.statusText)
      // 重置表单
      form.resetFields();
      // 关闭模态框
      this.setState({ visible: false });
      this.reloadData();
    })
    
  });
};
// 将子组件的引用在父组件中进行保存，方便后期调用
saveFormRef = formRef => {
  this.formRef = formRef;
};
// 去添加
toAdd(){
  // 将默认值置空,模态框打开
  this.setState({product:{},visible:true})
}
// 去更新
toEdit(record){
  // 更前先先把要更新的数据设置到state中
  this.setState({product:record})
  // 将record值绑定表单中
  this.setState({visible:true})
}
//加载查询的服务
handleSearch = ()=>{
  let product = this.props.form.getFieldsValue();
  axios.get("/product/findProductByName?name=" + product.productName)
  .then((result) => {
        this.setState({list:result.data})
  })
}

//更新
toEdit(record){
  // 更前先先把要更新的数据设置到state中
  this.setState({product:record})
  // 将record值绑定表单中
  this.setState({visible:true})
}
//返回成功创建订单成功的信息
Success=()=>{
  message.success("订单创建成功！")
}

  render(){
    const { getFieldDecorator } = this.props.form;
    let columns = [{
      title:"服务编号",
      dataIndex:"id",
      width:"12%"

  },{
      title:"服务名称",
      dataIndex:"name",
      width:"15%"
  },{
      title:"详情",
      dataIndex:"description",
      width:"35%"
  },{
      title:"价格",
      dataIndex:"price",
      width:"8%"
  },{
      title:"服务概览",
      dataIndex:"photo",
      width:"30%"
  },{
    title: '图片',
    align: 'center',
    dataIndex: 'photo',
    render(text){
      return (
        <img width={40} height={40} src={"http://134.175.154.93:8888/group1/"+text}/>
      )
    }
  },{
    title:'操作',
      width:160,
      align:"center",
      render:(text,record)=>{
        return (
          <div>
            <Button type='link' size="small" onClick={this.toEdit.bind(this,record)}>更新</Button>
            <Button type='link' size="small" className={styles.DeleteBtn} onClick={this.handleDelete.bind(this,record.id)}>删除</Button>
          </div>
        )
      }
  }];

// 当用户操作复选按钮的时候，将值获取到并且保存到state中
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      this.setState({ids:selectedRowKeys});
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', 
      name: record.name,
    }),
  };
 
    return (
      <div className={styles.product}>
        <Form>
          <FormItem>
              {
                  getFieldDecorator('productName',{
                      initialValue:'',
                      rules:[
                          {
                            required:true,
                              message:'输入不能为空'
                          }
                      ]
                  })(<Input className={styles.Input} style={{ width: 200 }} placeholder=" 请查询服务名称" />)
              }
              &nbsp;&nbsp;
              <Button type="primary" htmlType="submit" onClick={this.handleSearch}>查询</Button>
          </FormItem>
          <FormItem className={styles.additional}>
            <Button type="primary" onClick={this.toAdd.bind(this)}>添加</Button>
            <Button type="primary" onClick={this.reloadData} className={styles.selSerBtn}>所有服务</Button>  
          </FormItem>
          </Form> 
        <Table 
          bordered
          rowKey="id"
          size="small"
          loading={this.state.loading}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.list}/>

        <ProductForm
          initData={this.state.product}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}/>
      </div>
  )
  }
}


export default Form.create()(ProductPage);
