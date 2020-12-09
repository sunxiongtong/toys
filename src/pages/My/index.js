import React from 'react';
import toybg from '@/assets/toybg.jpg';
import './index.scss';
import { connect } from 'react-redux';
import * as userInfoActionsFromOtherFile from '../../actions/userinfo.js';
import http from '@/http.js';
import { user } from '@/urls.js';
import { List } from 'antd-mobile';
const Item = List.Item;

function setCookie(name, value) { 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + 3600 * 1000 * 24 * 30); 
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/"; 
}

class My extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            isLogin: false
        }
    }

    render() {
        const { phone,isLogin } = this.state;
        console.log(isLogin)
        return <div className="my-wrap">
            <div className="banner">
                <img src={toybg}></img>
                <div>{phone}</div>
            </div>
            <div>
                <List className="my-list">
                    <Item  arrow="horizontal" onClick={()=>{
                        this.props.history.push('/agreement');
                    }}>用户协议</Item>
                </List>
                {/* <List className="my-list">
                    <Item  arrow="horizontal" onClick={()=>{
                        this.props.history.push('/privacy');
                    }}>隐私政策</Item>
                </List> */}
            </div>
            <div>
                {isLogin && <div className="login-btn" onClick={()=>{
                    setCookie('token','');
                    this.props.userInfoActions('');
                    this.setState({
                        isLogin:false
                    })
                }}>退出登录</div>}
                {!isLogin && <div className="login-btn" onClick={()=>{
                    this.props.history.push('./login');
                }}>登录/注册</div>}
            </div>
        </div>
    }

    componentDidMount() {
        let token = this.props.token;
        
        if (token) {
            http.post(user.get, { oToken: token }).then((res) => {
                const { data } = res;
                const { cellphone } = data;
                
                if (cellphone) {
                    this.setState({
                        phone: cellphone.substr(0, 3) + '******' + cellphone.substr(7),
                        isLogin: true
                    })
                }
            })
        } else {
            this.setState({
                phone: '未登录'
            })
        }

    }
}

export default connect(
    state => ({
        token: state.userinfo.token,
    }),
    {
        userInfoActions: userInfoActionsFromOtherFile.updateToken,
    }
)(My)