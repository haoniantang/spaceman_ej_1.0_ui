import React from "react";
import { Form, Input, Button, message, Icon, Checkbox } from "antd";
import axios from '../../utils/axios'
import styles from './LoginPage.less'
const FormItem = Form.Item;
class FormLogin extends React.Component{
    handleSubmit = ()=>{
        let userInfo = this.props.form.getFieldsValue();
        axios.get("/customer/findCustomerById?id=" + userInfo.userName)
        .then((result) => {
            if(result.data.password === userInfo.userPwd)
            {
                message.success(userInfo.userName + "欢迎登陆")
                // dispatch({ type: '/customer' })
            }
            else
                message.error("用户名或密码错误，请重新输入")
        })
    } 

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles['login-form']}>
                <div className={styles['login-logo']}>
                  <img alt="" src="/src/img/ej-icon.svg" />
                  <span>EJie Home</span>
                </div>
                    <Form>
                        <FormItem>
                            {
                                getFieldDecorator('userName',{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:'用户名不能为空'
                                        },
                                        {
                                            min:4,max:10,
                                            message:'长度不在范围内'
                                        },
                                        {
                                            pattern:new RegExp('^\\w+$','g'),
                                            message:'用户名必须为字母或者数字'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user" className={styles.prefixIcon} />} placeholder=" 请输入用户名" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '',
                                    rules: []
                                })(
                                    <Input prefix={<Icon type="lock" className={styles.prefixIcon} />} type="password" placeholder=" 请输入密码" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName:'checked',
                                    initialValue: true
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a href="product" style={{float:'right'}}>忘记密码</a>
                        </FormItem>
                        <FormItem className={styles.additional}>
                            <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
            </div>
        );
    }
}

export default Form.create()(FormLogin);