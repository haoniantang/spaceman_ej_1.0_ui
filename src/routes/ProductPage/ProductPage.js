import React from 'react';
import styles from './ProductPage.less';
import axios from '../../utils/axios'
import {Table,Button,Input,Form,message} from 'antd'
const FormItem = Form.Item;

class ProductPage extends React.Component {

  constructor(){
    super();
    this.state = {
      ids:[],
      list:[],
      loading:false
    }
}


//生命周期函数，组件绑定时执行
componentDidMount(){
    this.reloadData();
}


//加载全部服务
reloadData(){
  this.setState({loading:true});
    axios.get("/product/findAllProduct")
    .then((result)=>{
      this.setState({list:result.data})
    })
    .finally(()=>{
        this.setState({loading:false});
    })
}

//加载查询的服务
handleSearch = ()=>{
  let product = this.props.form.getFieldsValue();
  axios.get("/product/findProductByName?name=" + product.productName)
  .then((result) => {
        this.setState({list:result.data})
  })
}

//把选择的服务的id传给后台
sendId=()=>{
  let productID = this.props.form.getFieldsValue();
  axios.post("/order/save",productID.id)
  .then((result) => {
    this.setState({list:result.data})
  })
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
  },];

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
      <div className={styles.title}>服务选择</div>
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
                                })(
                                    <Input className={styles.Input} placeholder=" 请查询服务名称" />
                                )
                            }
                        </FormItem>
                        <FormItem className={styles.additional}>
                            <Button type="primary" htmlType="submit" onClick={this.handleSearch}>查询</Button>
                            &nbsp;&nbsp;
                            <Button type="primary" onClick={this.reloadData}>所有服务</Button>
                            <Button type="primary" onClick={this.Success} onClick={this.sendId} className={styles.selSerBtn}>选择服务</Button>
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
      </div>
  )
  }
}


export default Form.create()(ProductPage);
