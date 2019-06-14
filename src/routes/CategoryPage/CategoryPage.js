import React from 'react';
import styles from './CategoryPage.less'
import {Modal, Button, Table, message} from 'antd'
import axios from '../../utils/axios'
import CategoryForm from './CategoryForm'

class CategoryPage extends React.Component {
    constructor(){
        super();
        this.state = {
          ids:[], // 批量删除的时候保存的id
          list:[],
          loading:false,
          visible:false,
          category:{}
        }
    }

    componentDidMount(){
        this.reloadData();
    }

    reloadData(){
        this.setState({loading:true});
        axios.get("/category/findAllCategory")
        .then((result)=>{
          // 将查询数据更新到state中
          this.setState({list:result.data})
        })
        .finally(()=>{
          this.setState({loading:false});
        })
    }

    handleDelete(id){
        Modal.confirm({
          title: '确定删除此类型吗?',
          // content: '删除后数据将无法恢复',
          onOk:() => {
            // 删除操作
            axios.get("/category/deleteCateGoryById",{
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

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
          // 表单校验完成后与后台通信进行保存
          axios.post("/category/insertCateGory",values)
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

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    toAdd(){
        // 将默认值置空,模态框打开
        this.setState({category:{},visible:true})
    }

    toEdit(record){
        // 更前先先把要更新的数据设置到state中
        this.setState({category:record, visible:true})
        // 将record值绑定表单中
        // this.setState({visible:true})
    }

    render() {
      let columns = [{
          title:'ID',
          dataIndex:'id'
        },{
          title:'名称',
          dataIndex:'name'
        },{
          title:'NUM',
          align:"center",
          dataIndex:'num'
        },{
          title:'父类型',
          dataIndex:'parentId'
        },{
          title:'操作',
          width:180,
          align:"center",
          render:(text,record)=>{
            return (
              <div>
                <Button type='link' size="small" onClick={this.toEdit.bind(this,record)}>修改</Button>
                <Button type='link' size="small" onClick={this.handleDelete.bind(this,record.id)}>删除</Button>
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
            disabled: record.name === 'Disabled Category', // Column configuration not to be checked
            name: record.name,
          }),
        };
      
      return(
        <div className={styles.customer}>
          <div className={styles.title}>分类管理</div>
          <div className={styles.btns}>
            <Button onClick={this.toAdd.bind(this)}>添加</Button> &nbsp;
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

          <CategoryForm
            initData={this.state.customer}
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}/>
        </div>
      )
    }
}

export default CategoryPage;