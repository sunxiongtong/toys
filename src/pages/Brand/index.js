import React from 'react';
import NavBar from '@/components/NavBar';
import './index.scss';
import http from '@/http.js';
import { banner } from '@/urls.js'
import { connect } from 'react-redux';
import * as brandActionsFromOtherFile from '../../actions/brand.js'

class Brand extends React.Component {
    constructor(props){
        super(props);

    }

    init(){
        // 固定18
        http.post(banner.getBanner, { oTken: this.props.token, xtype: 1, status: 3, pagesize: 18, pageindex: 1 }).then((res)=>{
            const {data} = res;
            const {list} = data;

            // console.log(list)
            this.props.getBrandList(list);
        })
    }

    render() {
        const {brandList = []} = this.props;
        
        return <div className="brand-wrap">
            <div className="navwrap">
                <NavBar title='品牌'></NavBar>
            </div>
            <div className="navbody">
                <div className="brand-content">
                    {
                        brandList.length>0 && brandList.map((item,index)=>{
                            return (
                                <div className="img-wrap" key={item.id+index+item.seq}>
                                    <img src={item.image}></img>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    }

    componentDidMount(){
        this.init();
    }
}

export default connect(
    state => ({
        token: state.userinfo.token,
        brandList:state.brand.brandList,
    }),
    {
        getBrandList:brandActionsFromOtherFile.getBrandList
    }
)(Brand)