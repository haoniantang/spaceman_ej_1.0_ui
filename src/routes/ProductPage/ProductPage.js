import React from 'react';
import styles from './ProductPage.less';
import axios from '../../utils/axios'
import {Table,Button,TreeSelect,Input,Form} from 'antd'
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

// //const { TreeSelect } = TreeSelect;
// const treeData = [
//   {
//     title: '衣物洗护',
//     value: '0-0-1',
//     key: '0-0-1',
//     children: [
//       {
//         title: '上衣',
//         value: '0-0-1',
//         key: '0-0-1',
//         children:[
//           {
//             title: '毛衣',
//             value: '0-0-1',
//             key: '0-0-1',
//           },
//         ],
//       },
//       {
//         title: '裙装',
//         value: '0-0-1',
//         key: '0-0-1',
//         children:[
//           {
//             title: '长裙',
//             value: '0-0-1',
//             key: '0-0-1',
//           },
//         ],
//       },
//       {
//         title: '裤类',
//         value: '0-0-1',
//         key: '0-0-1',
//         children:[
//           {
//             title: '长裤',
//             value: '0-0-1',
//             key: '0-0-1',
//           },
//         ],
//       },
//       {
//         title: '鞋类',
//         value: '0-0-1',
//         key: '0-0-1',
//         children:[
//           {
//             title: '运动鞋',
//             value: '0-0-1',
//             key: '0-0-1',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: '室内保洁',
//     value: '0-0-1',
//     key: '0-0-1',
//     children: [
//       {
//         title: '家庭清洁',
//         value: '0-0-1',
//         key: '0-0-1',
//         children:[
//           {
//             title: '日常打扫',
//             value: '0-0-1',
//             key: '0-0-1',
//           },
//         ],
//       },
//       {
//         title: '污渍清理',
//         value: '0-0-1',
//         key: '0-0-1',
//         children:[
//           {
//             title: '深度清理',
//             value: '0-0-1',
//             key: '0-0-1',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: '看护',
//     value: '0-0-1',
//     key: '0-0-1',
//     children: [
//       {
//         title: '妇幼',
//         value: '0-0-1',
//         key: '0-0-1',
//         children:[
//           {
//             title: '接送上学',
//             value: '0-0-1',
//             key: '0-0-1',
//           },
//           {
//             title: '医护月嫂',
//             value: '0-0-1',
//             key: '0-0-1',
//           },
//         ],
//       },
//       {
//         title: '病人',
//         value: '0-0-1',
//         key: '0-0-1',
//         children:[
//           {
//             title: '医院陪护',
//             value: '0-0-1',
//             key: '0-0-1',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: '其他',
//     value: '0-0-1',
//     key: '0-0-1',
//     children: [
//       {
//         title: '安保',
//         value: '0-0-1',
//         key: '0-0-1',
//         children:[
//           {
//             title: '个人保镖',
//             value: '0-0-1',
//             key: '0-0-1',
//           },
//         ],
//       },
//     ],
//   },
// ];

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
          {/* <TreeSelect
          style={{ width: 300 }}
          value={this.state.value}
          dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
          treeData={treeData}
          placeholder="服务列表"
          onChange={this.onChange}
          /> */}
          <Form>
                        <FormItem className={styles.Input}>
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
                                    <Input   placeholder=" 请查询具体服务名称" />
                                )
                            }
                        </FormItem>
                        <FormItem className={styles.additional}>
                            <Button type="primary" htmlType="submit" onClick={this.handleSearch}>查询</Button>
                        </FormItem>
                       </Form> 
          <Button type="primary" className={styles.selSerBtn}>选择服务</Button>
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
