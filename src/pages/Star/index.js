import React from 'react';
import SearchList from '@/components/SearchList/index';
import http from '@/http.js';
import { connect } from 'react-redux';
import { shop, banner } from '@/urls.js';
import NavBar from '@/components/NavBar';
import './index.scss';
import { Toast } from 'antd-mobile';
class BrandList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            records: []
        };

        this.pageSize = 21;
        this.pageObj = {
            page: 1,
            totalPages: undefined
        }
    }

    getRecord() {
        let pageObj = this.pageObj || {};
        if (pageObj.totalPages && pageObj.page > pageObj.totalPages) return;

        let params = {
            oToken: this.props.token,
            pageindex: pageObj.page,
            pagesize: this.pageSize,
        }

        http.post(shop.star, params).then((res) => {
            const { data, status, message } = res;

            const { list, pages } = data;
  
            if (status != 'OK' && message != '') {
                if(message.indexOf('无权限访问')>-1){
                    Toast.info("请先登录", 1);
                }else{
                    Toast.info(message, 1);
                }
                
                return;
            }
           
            this.setState((preState) => {
                return {
                    records: [...preState[`records`], ...list]
                }
            });

            //对应tab 页面配置更改
            pageObj.page++;
            pageObj.totalPages = pages;
        })

    }

    //滚轮事件
    handleScroll(e) {

        const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;

        // 滚动触发频率太高，设置节流
        if (this.timeout) {
            clearTimeout(this.timeout);
        }


        this.timeout = setTimeout(() => {
            // console.log(scrollHeight, scrollTop, scrollHeight - scrollTop, clientHeight)
            //滑动到底部调接口 某些浏览器可能设置缩放 导致像素不是整数 + 1 防止这些误差
            if (scrollHeight - scrollTop <= clientHeight + 1) {
                this.getRecord();
            }
            clearTimeout(this.timeout);

        }, 50)

    }

    init() {
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

        this.getRecord();
    }

    render() {
        const { records = [] } = this.state;
        return <div className="brandlist star-wrap">
            <div className="navwrap">
                <NavBar title='收藏'></NavBar>
            </div>
            <div className="list-wrap">
                <SearchList records={records} scrollEvent={this.handleScroll.bind(this)}></SearchList>
            </div>
        </div>
    }

    componentDidMount() {
        this.init();
    }
}

export default connect(
    state => ({
        token: state.userinfo.token,
        // brandList:state.brand.brandList
    }),
    {

    }
)(BrandList)