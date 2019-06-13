import React from 'react';
import styles from './ProductPage.less';
import axios from '../../utils/axios'
import {Table,Button,TreeSelect} from 'antd'


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

reloadProductData(id){
    axios.get("/product/findProductByCategoryId",{
      params:{
        id:id
      }
    })
    .then((result)=>{
      this.setState({list:result.data})
    })
  }

  render(){
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
// let treeData = [
//   {
//     title: '衣物洗护',
//     value: '2001',
//     key: '2001',
//     children: [
//       {
//         title: '上衣',
//         value: '2006',
//         key: '2006',
//         children:[
//           {
//             title: '毛衣',
//             value: '7001',
//             key: '7001',
//           },
//         ],
//       },
//       {
//         title: '裙装',
//         value: '2007',
//         key: '2007',
//         children:[
//           {
//             title: '长裙',
//             value: '7002',
//             key: '7002',
//           },
//         ],
//       },
//       {
//         title: '裤类',
//         value: '2008',
//         key: '2008',
//         children:[
//           {
//             title: '长裤',
//             value: '7003',
//             key: '7003',
//           },
//         ],
//       },
//       {
//         title: '鞋类',
//         value: '2009',
//         key: '2009',
//         children:[
//           {
//             title: '运动鞋',
//             value: '7004',
//             key: '7004',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: '室内保洁',
//     value: '2002',
//     key: '2002',
//     children: [
//       {
//         title: '家庭清洁',
//         value: '2010',
//         key: '2010',
//         children:[
//           {
//             title: '日常打扫',
//             value: '7005',
//             key: '7005',
//           },
//         ],
//       },
//       {
//         title: '污渍清理',
//         value: '2011',
//         key: '2011',
//         children:[
//           {
//             title: '深度清理',
//             value: '7006',
//             key: '7006',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: '看护',
//     value: '2003',
//     key: '2003',
//     children: [
//       {
//         title: '妇幼',
//         value: '2012',
//         key: '2012',
//         children:[
//           {
//             title: '接送上学',
//             value: '7007',
//             key: '7007',
//           },
//           {
//             title: '医护月嫂',
//             value: '7010',
//             key: '7010',
//           },
//         ],
//       },
//       {
//         title: '病人',
//         value: '2013',
//         key: '2013',
//         children:[
//           {
//             title: '医院陪护',
//             value: '7008',
//             key: '7008',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: '其他',
//     value: '2005',
//     key: '2005',
//     children: [
//       {
//         title: '安保',
//         value: '2014',
//         key: '2014',
//         children:[
//           {
//             title: '个人保镖',
//             value: '7009',
//             key: '7009',
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
      <div>
          {/* <TreeSelect
          style={{ width: 300 }}
          value={this.state.value}
          dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
          treeData={treeData}
          placeholder="服务列表"
          onChange={this.onChange}
          dataSource={this.state.list}
          /> */}
          <Button type="primary" className={styles.selSerBtn}>选择服务</Button>
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
