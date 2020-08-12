import React from 'react' ;
import {bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userInfoActionsFromOtherFile from '../../actions/userinfo.js'
import http from '@/http.js';
import {shop} from '@/urls.js'
import { Button } from 'antd-mobile';

class Home extends React.Component {
    componentDidMount(){
        this.props.userInfoActions({title:'123456'})
        http.post(shop.getListByTag);
    }

    render(){
        return <div>{this.props.title}<Button>Start</Button></div>
    }
}

export default connect(
    state =>({
        title:state.userinfo.title
    }),
    {
        userInfoActions:userInfoActionsFromOtherFile.updateTitle
    }
)(Home)