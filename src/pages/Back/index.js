import React from 'react';
import NavBar from '@/components/NavBar';
import http from '@/http.js';
import { banner } from '@/urls.js'
import { connect } from 'react-redux';
import * as brandActionsFromOtherFile from '../../actions/brand.js'
import './index.scss'
class GoBack extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { brandList = [] } = this.props;

        return <div className="brand-wrap btest">
            <div onClick={() => {
                this.props.history.goBack();
                return false;
            }}>回退1</div>
            <div onClick={() => {
                this.props.history.go(-1);
                return false;
            }}>回退2</div>
            <div onClick={(e) => {
                this.props.history.goBack();
                e.preventDefault()
            }}>回退3</div>
            <div onClick={(e) => {
                this.props.history.go(-1);
                e.preventDefault()
            }}>回退4</div>
            <div onClick={() => {
                setTimeout(()=>{
                    this.props.history.goBack();
                },500)
                return false;
            }}>回退5</div>
            <div onClick={() => {
                setTimeout(()=>{
                    this.props.history.go(-1);
                },500)
                return false;
            }}>回退6</div>
            <div onClick={(e) => {
                setTimeout(()=>{
                    this.props.history.goBack();
                },500)
                e.preventDefault()
            }}>回退7</div>
            <div onClick={(e) => {
                setTimeout(()=>{
                    this.props.history.go(-1);
                },500)
                e.preventDefault()
            }}>回退8</div>
            <div onClick={(e) => {
                setTimeout(()=>{
                    this.props.history.go(-2);
                },500)
                e.preventDefault()
            }}>回退两次</div>
        </div>
    }

    componentDidMount() {

    }
}

export default connect(
    state => ({
        token: state.userinfo.token,
        brandList: state.brand.brandList,
    }),
    {
        getBrandList: brandActionsFromOtherFile.getBrandList
    }
)(GoBack)