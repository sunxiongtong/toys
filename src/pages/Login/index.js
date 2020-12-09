import React from 'react';
import NavBar from '@/components/NavBar';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import * as userInfoActionsFromOtherFile from '../../actions/userinfo.js';
import { connect } from 'react-redux';
import './index.scss';
import http from '@/http.js';
import { user } from '@/urls.js';

function setCookie(name, value) {
    var exp = new Date();
    exp.setTime(exp.getTime() +  3600 * 1000 * 24 * 30);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}

class Login extends React.Component {
    login() {

        let phone = this.phone.state.value;
        let pwd = this.pwd.state.value;

        if (!phone) {
            Toast.info('请输入手机号', 3);
            return;
        }

        if (!(/^1[3456789]\d{9}$/.test(phone))) {
            Toast.info("手机号码有误，请重填", 3);
            return;
        }

        if (!pwd) {
            Toast.info('请输入密码', 3);
            return;
        }

        if (phone && pwd) {
            http.post(user.login, { cellphone: phone, password: pwd, name: '', oToken: '' }).then((res) => {
                const { data, message, status } = res;
                if (status === 'ERROR') {
                    Toast.info(message, 3);
                } else {
                    this.props.userInfoActions(data.token);
                    Toast.info('登录成功', 1, () => {
                        setCookie('token', data.token)
                        this.props.history.push('/');
                    });
                }
            })
        }
    }

    render() {
        return <div>
            <div className="navwrap">
                <NavBar title='登录' showIcon={true}></NavBar>
            </div>
            <div className="nav-head"></div>
            <div className="navbody" style={{ background: '#fff', height: 'calc(100% - 50px)' }}>
                <div className="login-body">
                    <List>
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
                        <Button type="primary" onClick={this.login.bind(this)}>登录</Button>
                    </div>
                    <div className="register" onClick={() => { this.props.history.push('/register'); }}>
                        立即注册
                    </div>
                </div>
            </div>
        </div>
    }

    componentDidMount() {

    }
}

export default connect(
    state => ({

    }),
    {
        userInfoActions: userInfoActionsFromOtherFile.updateToken,
    }
)(Login)