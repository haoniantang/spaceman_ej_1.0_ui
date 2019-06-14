import React from 'react';
import {Form,Modal,Input} from 'antd'

class CategoryForm extends React.Component {
    render() {
        const formLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
        }

        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Modal
                visible={visible}
                title="添加分类信息"
                okText="提交"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical" {...formLayout}>
                    <Form.Item label="姓名" >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入名称!' }],
                    })(<Input />)}
                    </Form.Item>
                    <Form.Item label="NUM" >
                    {getFieldDecorator('num', {
                        rules: [{ required: true, message: '请输入NUM!' }],
                    })(<Input />)}
                    </Form.Item>
                    <Form.Item label="父类型">
                    {getFieldDecorator('parentId', {
                        rules: [{ required: true, message: '请输入父类型!' }],
                    })(<Input.Password />)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const mapPropsToFields = (props)=>{
    let obj = {};
    for(let key in props.initData){
      let val = props.initData[key];
      obj[key] = Form.createFormField({value:val})
    }
    return obj;
  }
  
export default Form.create({
    mapPropsToFields
})(CategoryForm);