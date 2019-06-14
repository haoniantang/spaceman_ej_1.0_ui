import React from 'react';
import styles from './ProductPage.less';
import axios from '../../utils/axios'
import {Table,Button,Input,Form} from 'antd'
const FormItem = Form.Item;

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
    axios.get("/product/findAllProduct")
    .then((result)=>{
      this.setState({list:result.data})
    })
    .finally(()=>{
        this.setState({loading:false});
    })
}

//查询栏
handleSearch = ()=>{
  let product = this.props.form.getFieldsValue();
  axios.get("/product/findProductByName?name=" + product.productName)
  .then((result) => {
        this.setState({list:result.data})
  })
}

  render(){
    const { getFieldDecorator } = this.props.form;
    let columns = [{
      title:"列产品序",
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
                        </FormItem>
                       </Form> 
          <Button type="primary" className={styles.selSerBtn}>选择服务</Button>
          <br/>
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


export default Form.create()(ProductPage);
