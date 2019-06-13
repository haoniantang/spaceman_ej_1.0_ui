import React from 'react';
// 引入css进行页面美化
import styles from './CommentPage.less'
// 导入组件
import {Modal,Button, Table,message} from 'antd'
import axios from '../../utils/axios'

class CommentPage extends React.Component {
    // 局部状态state
    constructor(){
        super();
        this.state = {
        ids:[], // 批量删除的时候保存的id
        list:[],
        loading:false,
        visible:false,
        comment:{}
        }
    }
    // 在生命周期钩子函数中调用重载数据
    componentDidMount(){
        this.reloadData();
    }
    // 重载数据
    reloadData(){
        this.setState({loading:true});
        axios.get("/comment/findCommentByOrderId?5001")
        .then((result)=>{
        // 将查询数据更新到state中
        this.setState({list:result.data})
        })
        .finally(()=>{
        this.setState({loading:false});
        })
    }
    



  // 组件类务必要重写的方法，表示页面渲染
  render(){
    // 变量定义
    let columns = [{
      title:'描述',
      dataIndex:'content'
    },{
      title:'评论时间',
      dataIndex:'commentTime'
    },{
      title:'操作',
      width:120,
      align:"center",
      render:(text,record)=>{
        return (
          <div>
            <Button type='link' size="small" >删除</Button>
            <Button type='link' size="small" >修改</Button>
          </div>
        )
      }
    }]
    
    // 返回结果 jsx(js + xml)
    return (
      <div className={styles.comment}>
        <div className={styles.title}>顾客管理</div>
        <div className={styles.btns}>
          
          <Button type="link">导出</Button>
        </div>
        <Table 
          bordered
          rowKey="id"
          size="small"
          loading={this.state.loading}
          columns={columns}
          dataSource={this.state.list}/>
      </div>
    )
  }
}
export default CommentPage;