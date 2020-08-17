import { NavBar, Icon,Toast } from 'antd-mobile';
import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import http from '@/http.js';
import { shop, banner } from '@/urls.js';
class MyNavbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rightContent:''
        }
    }
    render() {
        const {title = 'Title',showIcon = false,showRight=false,star=false,changeStar} = this.props;
        
        return (
            <NavBar
                mode="light"
                icon={showIcon && <Icon type="left" />}
                onLeftClick={() => this.props.history.goBack()}
                rightContent={
                    [showRight?(<span style={{fontSize:'.28rem'}} onClick={()=>{
                        let token = this.props.token;
                        let star = this.props.star;
                        if(!token){
                            this.props.history.push('/login');
                            return ;
                        }
                        
                        let paramsObj = {
                            oToken:this.props.token,
                            productID:this.props.productID
                        }
                        changeStar();
                        if(star){
                            http.post(shop.focusRemove,paramsObj).then(()=>{
                                Toast.info('取消关注成功',3)
                            });
                        }else{
                            http.post(shop.focusAdd,paramsObj).then(()=>{
                                Toast.info('关注成功',3)
                            });
                        }
                    }}>{!star?'关注':'取消关注'}</span>):'']
                }
            >{title}</NavBar>
        )
    }

    componentDidMount(){
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
        brandList:state.brand.brandList,
    }),
    {
        
    }
)(MyNavbar));