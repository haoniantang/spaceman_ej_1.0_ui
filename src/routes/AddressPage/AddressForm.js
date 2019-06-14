import React from 'react';

import {Form, Modal, Input, Cascader} from 'antd';
import {cityData} from './CityData';

class AddressForm extends React.Component{


    //测试
    onChange= (value)=> {
        console.log(value);
        this.props.form.setFieldsValue({ province: value[0] });
        this.props.form.setFieldsValue({ city: value[1] });
        this.props.form.setFieldsValue({ area: value[2]});
        console.log(value[0]);
        console.log(value[1]);
        console.log(value[2]);
    }
 
  
    render(){
        const formLayout = {
            labelCol:{
                xs:{ span: 24},
                sm:{ span: 6 },
            },
            wrapperCol:{
                xs:{ span: 24},
                sm:{ span: 16},
            },
        }

        //父组件传递给子组件值
        const { visible, onCancel, onCreate, form }= this.props;
        const { getFieldDecorator} =form;

        getFieldDecorator('id')
        getFieldDecorator('customerId')

        return (
            <Modal 
                visible={visible}
                title="添加地址信息"
                okText='提交'
                onCancel={onCancel}
                onOk={onCreate}
                >
                <Form layout='vertical'{...formLayout}>
                    <Form.Item label='地址选择'>
                        {getFieldDecorator('addressAll',{
                            rules: [{required: true, message: '地址不能为空！'}]
                        })(
                            <Cascader
                            options={cityData}
                            //defaultValue={['河南省', '郑州市', '中原区']}
                            //onChange={this.onChange}
                            />
                        )}
                    </Form.Item>
                    {/* <Form.Item label="省份">
                        {getFieldDecorator('province', {
                            rules: [{required: true, message: '省份为空！'}]
                        }) (<Input></Input>)}
                    </Form.Item>
                    <Form.Item label="城市">
                        {getFieldDecorator('city', {
                            rules: [{required: true, message: '城市为空！'}]
                        }) (<Input></Input>)}
                    </Form.Item>*/}
                    <Form.Item label="街道">
                        {getFieldDecorator('address', {
                            rules: [{required: true, message: '街道为空！'}]
                        }) (<Input></Input>)}
                    </Form.Item>
                    <Form.Item label="电话">
                        {getFieldDecorator('telephone', {
                            rules: [{required: false, message: '电话为空！'}]
                        }) (<Input></Input>)}
                    </Form.Item>
                </Form>

            </Modal>
        )
    }
}
// 将通过props从父组件中获取的值拿出来设置到表单元素上
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
  })(AddressForm);