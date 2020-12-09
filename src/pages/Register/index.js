import React from 'react';
import NavBar from '@/components/NavBar';
import { List, InputItem,Button,Toast } from 'antd-mobile';
import * as userInfoActionsFromOtherFile from '../../actions/userinfo.js';
import { connect } from 'react-redux';
import './index.scss';
import http from '@/http.js';
import { user } from '@/urls.js';

class Register extends React.Component {
    constructor(props){
        super(props);


    }

    register(e){
        let phone = this.phone.state.value;
        let pwd = this.pwd.state.value;
        let name = this.nickname.state.value;

        if(!phone){
            Toast.info('请输入手机号',3);
            return;
        }

        if(!(/^1[3456789]\d{9}$/.test(phone))){ 
            Toast.info("手机号码有误，请重填",3);  
            return ; 
        } 

        if(!pwd){
            Toast.info('请输入密码',3);
            return;
        }   

        if(!name){
            Toast.info('请输入昵称',3);
            return;
        }        

        http.post(user.register,{cellphone:phone,password:pwd,name,oToken:''}).then((res)=>{
            if(status === 'ERROR'){
                Toast.info(message,3);
            }else{
               
                Toast.info('注册成功',3,()=>{
                    this.props.history.push('/login');
                }); 
            }
        })
    }

    render() {
        return <div>

            <div className="navwrap">
                <NavBar title='注册' showIcon={true}></NavBar>
            </div>
            <div className="nav-head"></div>
            <div className="navbody" style={{ background: '#fff', height: 'calc(100% - 50px)' }}>
                <div className="register-body">
                    <List>
                        <InputItem
                            clear
                            placeholder="请输入昵称"
                            ref={el => this.nickname = el}
                        >
                            昵称
                        </InputItem>
                        <InputItem
                            clear
                            placeholder="请输入手机号"
                            ref={el => this.phone = el}
                        >
                            手机号
                        </InputItem>
                        <InputItem
                            clear
                            placeholder="请输入密码"
                            type="password"
                            ref={el => this.pwd = el}
                        >密码</InputItem>

                    </List>
                    <div className="login-btn">
                        <Button type="primary" onClick={this.register.bind(this)}>立即注册</Button>
                    </div>
                    
                </div>
            </div>
        </div>
    }
}

export default Register