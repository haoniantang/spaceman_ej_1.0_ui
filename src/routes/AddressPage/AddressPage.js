import React from 'react';
import {Modal, Button, Table, message} from 'antd';
import styles from './AddressPage.css';
import axios from '../../utils/axios';
import AddressForm from './AddressForm';

class AddressPage extends React.Component{
    //局部状态
    constructor(){
        super();
        this.state={
            list:[],
            loading:false,
            visible:false,
            address:{}
        }
    }

    componentDidMount(){
        this.reloadData();
    }

    reloadData(){
        this.setState({loading:true});
        axios.get("/address/findAllAddress")
        .then((result)=>{
            this.setState({list:result.data})
        })
        .finally(()=>{
            this.setState({loading:false});
        })
    }

    //单个删除
    handleDelete(id){
        Modal.confirm({
            title:'确认删除这条地址吗？',
            content:'删除后数据将无法恢复',
            onOk:()=>{
                axios.get('/address/deleteAddressById',{
                    params:{
                        id:id
                    }
                })
                .then((result)=>{
                    message.success(result.statusText)
                    this.reloadData();
                })

            }
        })
    }
    //取消按钮的事件处理
    handleCancel=()=>{
        this.setState({visible:false})
    }

    //确认按钮的事件处理
    handleCreate=()=>{
        const form = this.formRef.props.form;
        form.validateFields((err, values)=>{
            if(err){
                return ;
            }
            alert(JSON.stringify(values));
            axios.post("/address/saveOrUpdateAddress", values)
            .then( (result)=>{
                message.success(result.statusText)
                form.resetFields();
                this.setState({visible: false});
                this.reloadData();
            })
        })
    }

    //将自住兼的引用在父组件中进行保存，方便后期调用
    saveFormRef = formRef =>{
        this.formRef= formRef;
    }
    //修改地址信息
    toEdit(record){
        this.setState({address:record})
        this.setState({visible:true})
    }
    //添加新地址
    toAdd(){
        this.setState({address:{}, visible:true})
    }


    render(){
        let columns = [{
            title:'ID',
            dataIndex:'id'
        },{
            title:'省份',
            dataIndex:'province'
        },{
            title:'城市',
            dataIndex:'city'
        },{
            title:'地区',
            dataIndex:'area'
        },{
            title:'街道',
            dataIndex:'address'
        },{
            title:'电话',
            dataIndex:'telephone'
        },{
            title:'所属顾客ID',
            dataIndex:'customerId'
        },{
            title:'操作',
            width:120,
            align:"center",
            render:(text,record)=>{
                return (
                <div>
                <Button type='link' size="small" onClick={this.handleDelete.bind(this, record.id)}>删除</Button>
                <Button type='link' size="small" onClick={this.toEdit.bind(this,record)}>修改</Button>
                </div>
            )}
        }]

        return (
            <div className={styles.address}>
                <div className={styles.title}>地址管理</div>
                <div className={styles.btns}>
                    <Button onClick={this.toAdd.bind(this)}>添加</Button>
                </div>
                <Table 
                    bordered
                    rowKey="id"
                    size="small"
                    loading={this.state.loading}
                    columns={columns}
                    dataSource={this.state.list}/>
                <AddressForm
                    initData={this.state.address}
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}/>
            </div>
        )
    }

}

export default AddressPage;