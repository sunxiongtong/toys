import React from 'react';
import SearchList from '@/components/SearchList/index';
import http from '@/http.js';
import { connect } from 'react-redux';
import { shop, banner } from '@/urls.js';
import NavBar from '@/components/NavBar';
import './index.scss';
import { Button, SearchBar, Tabs, Badge, Toast } from 'antd-mobile';
let loading = false;
class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            records: [],
            key: '',
            total: 0,
        };

        this.pageSize = 1000;
        this.pageObj = {
            page: 1,
            totalPages: 0
        }
        this.scrollTop = 0;

    }

    getRecord(key) {
        console.log(!key,loading,this.state.records.length !== 0 && this.state.records.length === this.state.total)
        if (!key) {
            return;
        }
        if (loading) {
            return;
        }
        let pageObj = this.pageObj || {};
        // console.log(pageObj.totalPages, pageObj.page, pageObj.totalPages && pageObj.page > pageObj.totalPages)
        // if (pageObj.totalPages && pageObj.page > pageObj.totalPages) return;

        if (this.state.records.length !== 0 && this.state.records.length === this.state.total) {
            return;
        }

        loading = true;


        let params = {
            oToken: this.props.token,
            key,
            pageindex: pageObj.page,
            pagesize: this.pageSize,
        }

        http.post(shop.search, params).then((res) => {
            const { data, status, message } = res;

            const { list, pages } = data;
            loading = false;
            if (status != 'OK' && message != '') {
                Toast.info(message, 3);
                return;
            }

            if (status === 'OK' && list.length === 0) {
                Toast.info('查找不到该商品！', 2);
                return;
            }

            this.setState((preState) => {
                return {
                    records: [...preState.records, ...list],
                    total: data.total
                }
            }, () => {
                console.log('更新完成', this.state.records)
            });
            
            //对应tab 页面配置更改
            pageObj.page++;
            pageObj.totalPages = pages;
        }).catch(err => {
            Toast.info('请求失败', 2);
            loading = false;
        })

    }

    //滚轮事件
    handleScroll(e) {

        const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;

        this.scrollTop = scrollTop;

        // 滚动触发频率太高，设置节流
        if (this.timeout) {
            clearTimeout(this.timeout);
        }


        this.timeout = setTimeout(() => {
            //滑动到底部调接口 某些浏览器可能设置缩放 导致像素不是整数 + 1 防止这些误差
            if (scrollHeight - scrollTop <= clientHeight + 1) {
                this.getRecord(this.state.key);
            }
            clearTimeout(this.timeout);

        }, 50)
    }

    render() {
        const { records = [] } = this.state;

        return <div className="brandlist searchpage">
            <div className="navwrap">
                <NavBar title='查找商品' showIcon={true}></NavBar>
            </div>
            <div className="nav-head"></div>
            <div className="list-wrap">
                <div className="input-wrap">
                    <input placeholder="输入商品" ref={el => this.inp = el} value={this.state.key} onChange={(e) => {
                        let val = e.target.value;
                        this.setState({
                            key: val
                        })
                    }} />
                    <span onClick={() => {
                        let value = this.inp.value;

                        if (!value) {
                            Toast.info('请输入需要查找的商品', 2);
                            return;
                        }

                        this.setState({
                            records: [],
                            total: 0,
                            preValue: value
                        }, () => {
                           
                            this.getRecord(value);
                        })



                    }}>搜索</span>
                </div>
                <SearchList records={records} scrollEvent={this.handleScroll.bind(this)} keys={this.state.key}></SearchList>
            </div>
        </div>
    }

    componentDidMount() {
        let key = window.sessionStorage.getItem('key') || "";

        if (key && key != "undefined") {
            key = decodeURI(key)
            this.getRecord(key)
            this.setState({
                key: key
            }, () => {
                window.sessionStorage.removeItem('key');
            })
        }
    }

    componentDidUpdate() {
        console.log(loading, this.state.key)
    }
}

export default connect(
    state => ({
        token: state.userinfo.token,
        // brandList:state.brand.brandList
    }),
    {

    }
)(SearchPage)