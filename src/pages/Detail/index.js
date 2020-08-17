import React from 'react';
import http from '@/http.js';
import { shop, banner } from '@/urls.js';
import { connect } from 'react-redux';
import NavBar from '@/components/NavBar';
import './index.scss';
import { Toast } from 'antd-mobile';

class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageList: [],
            productObj: {},
            star:false,
            productID:''
        }
    }

    changeStar(){
        this.setState({
            star:!this.state.star
        })
    }

    render() {
        const { imageList = [], productObj = {},star=false,productID } = this.state;

        return <div className="detail-wrap">
            <div className="navwrap">
                <NavBar title='商品详情' showIcon={true} star={star} changeStar={this.changeStar.bind(this)} showRight={true} productID={productID}></NavBar>
            </div>
            <div className="navbody detail-content" style={{ height: 'calc(100% - 45px)', background: '#fff' }}>
                <div className="Specifications content-wrap">
                    <div className="shop-top">
                        <img src={productObj.image}></img>
                    </div>
                    <div className="title">—— 规格 ——</div>
                    <div>

                        <div className="line">
                            <span className="left">商品名</span>
                            <span className="right">{productObj.name}</span>
                        </div>
                        <div className="line">
                            <span className="left">尺寸</span>
                            <span className="right">{productObj.spec1}</span>
                        </div>
                        <div className="line">
                            <span className="left">价格</span>
                            <span className="right">{productObj.spec2}</span>
                        </div>
                        <div className="line">
                            <span className="left">重量</span>
                            <span className="right">{productObj.spec3}</span>
                        </div>
                        {/* <div className="line">
                            <span className="left">有无品牌</span>
                            <span className="right">{productObj.spec2}</span>
                        </div>
                        <div className="line">
                            <span className="left">有无视频</span>
                            <span className="right">{productObj.spec2}</span>
                        </div> */}
                        <div className="line">
                            <span className="left">产品编码</span>
                            <span className="right">{productObj.code}</span>
                        </div>
                        <div className="line">
                            <span className="left">备注</span>
                            <span className="right">{productObj.description}</span>
                        </div>
                    </div>
                </div>
                <div className="content-wrap">
                    <div className="title">—— 供应商 ——</div>
                    <div>
                        <div className="line">
                            <span className="left">单位名称</span>
                            <span className="right">{productObj.name}</span>
                        </div>
                        <div className="line">
                            <span className="left">负责人</span>
                            <span className="right">{productObj.principal}</span>
                        </div>
                        <div className="line">
                            <span className="left">联系电话</span>
                            <span className="right">{productObj.phone}</span>
                        </div>
                        <div className="line">
                            <span className="left">QQ</span>
                            <span className="right">{productObj.qq}</span>
                        </div>
                        <div className="line">
                            <span className="left">公司网址</span>
                            <span className="right">{productObj.website}</span>
                        </div>
                        <div className="line">
                            <span className="left">单位地址</span>
                            <span className="right">{productObj.address}</span>
                        </div>
                        <div className="line">
                            <span className="left">手机</span>
                            <span className="right">{productObj.cellphone}</span>
                        </div>
                        {/* <div className="line">
                            <span className="left">微信</span>
                            <span className="right">{productObj.name}</span>
                        </div> */}
                        <div className="line">
                            <span className="left">email</span>
                            <span className="right">{productObj.mail}</span>
                        </div>
                        <div className="line">
                            <span className="left">联系人</span>
                            <span className="right">{productObj.principal}</span>
                        </div>
                    </div>
                </div>
                <div className="content-wrap">
                    <div className="title">—— 图片展示 ——</div>
                </div>
                <div className="brand-content">
                    {
                        imageList.length > 0 && imageList.map((item, index) => {
                            return (
                                <div className="img-wrap" key={item + index}>
                                    <img src={item}></img>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    }

    componentDidMount() {
        let { search = '' } = this.props.location;

        let parseQueryString = function () {

            var str = search;
            var objURL = {};

            str.replace(
                new RegExp("([^?=&]+)(=([^&]*))?", "g"),
                function ($0, $1, $2, $3) {
                    objURL[$1] = $3;
                }
            );
            return objURL;
        };
        let params = parseQueryString();
        if (!this.props.token) {
            Toast.info('token过期,请重新登录');
            this.props.history.push('/login');
            return;
        }
        let paramsObj = { id: params['productid'], salerid: params['salerid'], oToken: this.props.token };

        this.setState({
            productID:params['productid']
        });

        http.post(shop.getFileLoad, paramsObj).then((res) => {
            const { data } = res;

            this.setState({
                imageList: data.images.split(',')
            })
        })

        let obj = {};

        http.post(shop.getLoad, paramsObj).then(res => {
            const { data } = res;

            this.setState((preState) => {
                return { productObj: { ...preState.productObj, ...data } }
            })
        })
        
        http.post(shop.isFocus,{productid:params['productid'],oToken:this.props.token}).then((res)=>{
            const { data } = res;

            if(data !== null){
                this.setState({
                    star:true
                })
            }
        })
        http.post(shop.getSkuLoad, paramsObj).then(res => {
            const { data } = res;

            this.setState((preState) => {
                return { productObj: { ...preState.productObj, ...data } }
            })
        })

        http.post(shop.getLoadInfo, { id: paramsObj.salerid, oToken: paramsObj.oToken }).then(res => {
            const { data } = res;

            this.setState((preState) => {
                return { productObj: { ...preState.productObj, ...data } }
            })
        })
    }


}

export default connect(
    state => ({
        token: state.userinfo.token,
        // brandList:state.brand.brandList
    }),
    {

    }
)(Detail)