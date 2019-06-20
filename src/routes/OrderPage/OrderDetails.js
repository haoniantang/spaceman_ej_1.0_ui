import React from 'react'
import {Button,Tabs} from 'antd'
import axios from '../../utils/axios';

class CustomerDetails extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      orders:[]
    }
  }

   //加载订单信息
   loadOrders(){
    axios.get("/order/query",{
      params:{customerId:this.props.location.payload.id}
    })
    .then((result)=>{
      this.setState({
        orders:result.data
      })
    })
  }

  render(){
    const { TabPane } = Tabs;
    
    function callback(key) {
      console.log(key);
    }

    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="订单详情" key="1">
            {JSON.stringify(this.state.orders)}
          </TabPane>
        </Tabs>
        <Button type="link" onClick={()=>{this.props.history.goBack()}}>返回</Button>
      </div>
    )
  }
}

export default CustomerDetails;