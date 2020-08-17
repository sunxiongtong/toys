import React from 'react';
import { connect } from 'react-redux';
import * as userInfoActionsFromOtherFile from '../../actions/userinfo.js';
import http from '@/http.js';
import { shop, banner } from '@/urls.js';
import { Button, SearchBar, Tabs, Badge, Toast } from 'antd-mobile';
import './index.scss'
import SearchList from '@/components/SearchList/index';
import Banner from '@/components/Banner/index';

const tabs = [
    { title: <Badge >推荐专区</Badge> },
    { title: <Badge >上新专区</Badge> },
    { title: <Badge >版权品牌</Badge> },
    { title: <Badge >全部商品</Badge> },
];

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bannerList: []
        }

        this.pageSize = 8;
    }

    getRecord(type) {
        let tag = this.state[`type${type}`].text;
        let pageObj = this[`pageObj${type}`];
        // console.log(this,pageObj)
        // console.log(pageObj.page, pageObj.totalPages,pageObj)
        if (pageObj.totalPages && pageObj.page > pageObj.totalPages) return;

        let params = {
            oToken: this.props.token,
            tag,
            pageindex: pageObj.page,
            pagesize: this.pageSize,
        }

        http.post(shop.getListByTag, params).then((res) => {
            const { data, status, message } = res;

            const { list, pages } = data;
            if (status != 'OK' && message != '') {
                Toast.info(message, 3);
                return;
            }
            // console.log(list)
            this.setState((preState) => {
                return {
                    [`records${type}`]: [...preState[`records${type}`], ...list]
                }
            }, () => {
                // console.log(this.state)
            });

            //对应tab 页面配置更改
            pageObj.page++;
            pageObj.totalPages = pages;
        })

    }

    //滚轮事件
    handleScroll(e) {
        const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
        const type = e.currentTarget.dataset.type;

        // 滚动触发频率太高，设置节流
        if (this.timeout) {
            clearTimeout(this.timeout);
        }


        this.timeout = setTimeout(() => {
            // console.log(scrollHeight, scrollTop, scrollHeight - scrollTop, clientHeight)
            //滑动到底部调接口 某些浏览器可能设置缩放 导致像素不是整数 + 1 防止这些误差
            if (scrollHeight - scrollTop <= clientHeight + 1) {
                this.getRecord(type);
            }
            clearTimeout(this.timeout);

        }, 50)

    }

    handleTabChange(index) {

        if (this.state[`records${index + 1}`].length > 0) {
            return;
        }

        this.getRecord(index + 1);
    }

    init() {
        // 初始化分类
        http.post(shop.getConfigClassify, { name: 'tags', oToken: this.props.token }).then((res) => {
            const { data } = res;
            const value = JSON.parse(data.value);

            this.setState({
                configType: value
            })

            value.forEach((typeObj) => {
                this.setState({
                    [`records${typeObj.name}`]: [],
                    [`type${typeObj.name}`]: typeObj,
                })
                this[`pageObj${typeObj.name}`] = {
                    page: 1,
                    totalPages: undefined
                }
            })

            this.getRecord(1);
        })

        //初始化轮播图
        http.post(banner.getBanner, { oToken: this.props.token, xtype: 2, status: 3, pagesize: 10, pageindex: 1 }).then((res) => {
            const { data } = res;
            const { list } = data;

            this.setState({
                bannerList: list
            })
        })
    }

    render() {
        const { configType = [], bannerList = [] } = this.state;

        return (
            <>
                <div onClick={() => { this.props.history.push('/searchpage') }}>
                    <SearchBar placeholder="搜索商品" maxLength={8} disabled />
                </div>
                <Banner list={bannerList}></Banner>
                <div className='tab-wrap'>
                    <Tabs tabs={tabs}
                        initialPage={0}
                        onChange={(tab, index) => { this.handleTabChange(index); }}
                    >
                        {
                            configType.length > 0 && configType.map((config) => {
                                return (
                                    <div className="slide" key={config.name + config.text}>
                                        <SearchList records={this.state[`records${config.name}`]} type={config.name} scrollEvent={this.handleScroll.bind(this)}></SearchList>
                                    </div>
                                )
                            })
                        }
                    </Tabs>
                </div>
            </>
        )
    }

    componentDidMount() {
        // this.props.userInfoActions({ token: '123456' })

        this.init();
    }

}

export default connect(
    state => ({
        token: state.userinfo.token,
        // brandList:state.brand.brandList
    }),
    {
        userInfoActions: userInfoActionsFromOtherFile.updateToken
    }
)(Home)