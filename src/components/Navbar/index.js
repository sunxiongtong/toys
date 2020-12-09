import { NavBar, Icon, Toast } from 'antd-mobile';
import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import http from '@/http.js';
import { shop, banner } from '@/urls.js';
import './index.scss';
import SelfBack from '@/assets/selfback.png';

// import creatHistory from 'history/createBrowserHistory';

const history = require("history").createBrowserHistory();
class MyNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rightContent: ''
        }
    }
    render() {
        const { title = 'Title', showIcon = false, showRight = false, star = false, changeStar } = this.props;

        return (
            <div className="self-nav">
                <div className="left" onClick={()=>{
                    this.props.history.go(-1);
                    return false;
                }}>{showIcon ? <img src={SelfBack} />:''}</div>
                <div className="title">{title}</div>
                <div className="right">
                    {
                        showRight ? (<span style={{ fontSize: '.28rem' }} onClick={() => {
                            let token = this.props.token;
                            let star = this.props.star;
                            if (!token) {
                                this.props.history.push('/login');
                                return;
                            }

                            let paramsObj = {
                                oToken: this.props.token,
                                productID: this.props.productID
                            }
                            changeStar();
                            if (star) {
                                http.post(shop.focusRemove, paramsObj).then(() => {
                                    Toast.info('取消关注成功', 3)
                                });
                            } else {
                                http.post(shop.focusAdd, paramsObj).then(() => {
                                    Toast.info('关注成功', 3)
                                });
                            }
                        }}>{!star ? '关注' : '取消关注'}</span>) : ''
                    }
                </div>
                {/* <NavBar
                    mode="light"
                    icon={showIcon && <Icon type="left" />}
                    onLeftClick={(e) => {
                        setTimeout(() => {
                            console.log(this.props.history)
                            this.props.history.goBack();
                        }, 100)
                        e.preventDefault();
                    }}
                    rightContent={
                        []
                    }
                >{title}</NavBar> */}
            </div>

        )
    }

    componentDidMount() {
        // const {star=false,productID,showRight=false}=this.props;

        // if(!showRight){
        //     return ;
        // }
        // let elem = 

        // this.setState({
        //     rightContent:elem
        // })
    }
}

export default withRouter(connect(
    state => ({
        token: state.userinfo.token,
        brandList: state.brand.brandList,
    }),
    {

    }
)(MyNavbar));