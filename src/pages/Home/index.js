import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as userInfoActionsFromOtherFile from '../../actions/userinfo.js';
import http from '@/http.js';
import { shop, banner } from '@/urls.js';
import { Button, SearchBar, Tabs, Badge, Toast,tabPane } from 'antd-mobile';
import './index.scss'
import SearchList from '@/components/SearchList/index';
import Banner from '@/components/Banner/index';
import love from '@/assets/love.png';

const tabs = [
    { title: <Badge >推荐专区</Badge> },
    { title: <Badge >上新专区</Badge> },
    { title: <Badge >版权品牌</Badge> },
    { title: <Badge >全部商品</Badge> },
];

const NavBarDataJSON = [
    { text: '推荐专区', className: "recommend" },
    { text: '上新专区', className: "shangxin" },
    { text: '版权品牌', className: "copyright" },
    { text: '全部商品', className: "all" },
]

function ShoppingNavBar1(props) {
    
    
}

const ShoppingNavBar = React.forwardRef((props,ref)=>{
    // console.log(ref)
    // props.handleTabChange(index)
    return <div className="navbar-wrap">
    {NavBarDataJSON.map((item, index) => {
        return <div key={item.className} className="navbar-box" onClick={() => { }}>
            <div className={String(item.className) + " navbar-swrap"}>{item.text.slice(0, 2)}</div>
            <div className="navbar-text">{item.text}</div>
        </div>
    })}
</div>
})


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bannerList: [],
            tabPage:0
        }

        this.pageSize = 8;
        this.tabRef = React.createRef();
    }

    getRecord(type) {
        let tag = this.state[`type${type}`].text;
        let pageObj = this[`pageObj${type}`];

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

            this.setState((preState) => {
                return {
                    [`records${type}`]: [...preState[`records${type}`], ...list]
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
        console.log(index)
        this.setState({
            tabPage:index
        })

        this.getRecord(index + 1);
    }

    //初始化轮播图
    getBannerList() {
        http.post(banner.getBanner, { oToken: this.props.token, xtype: 2, status: 3, pagesize: 10, pageindex: 1 }).then((res) => {
            const { data } = res;
            const { list } = data;

            this.setState({
                bannerList: list
            })
        })
    }

    // 初始化分类
    getTypes() {
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
    }

    init() {
        this.props.history.listen((location) => {
            if (location.pathname === '/') {
                this.getBannerList();
            }
        })

        this.getBannerList();

        this.getTypes();
    }

    render() {
        const { configType = [], bannerList = [] } = this.state;

        return (
            <div className="home">
                <div onClick={() => { this.props.history.push('/searchpage') }} className="search-box">
                    <SearchBar placeholder="搜索商品" maxLength={8} disabled />
                </div>
                <div style={{ width: '100%', height: 220 }}>
                    <Banner list={bannerList}></Banner>
                </div>
                <ShoppingNavBar handleTabChange={this.handleTabChange.bind(this)} ref={this.tabRef}></ShoppingNavBar>
                <div className='tab-wrap'>

                    {/* <Tabs tabs={tabs}
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
                    </Tabs> */}
                    <Tabs 
                        tabs={tabs}
                        initialPage={0}
                        onChange={(tab, index) => { console.log(tab,index);this.handleTabChange(index); }}
                        ref={(ref)=>{this.tabRef = ref;}}
                        tabPage={this.state.tabPage}
                    >
                        {
                            configType.length > 0 && configType.map((config) => {
                                return (

                                    <div className="slide" key={config.name + config.text}>
                                        <IndexList records={this.state[`records${config.name}`]} type={config.name} scrollEvent={this.handleScroll.bind(this)}></IndexList>
                                    </div>
                                )
                            })
                        }
                    </Tabs>
                </div>
            </div>
        )
    }

    componentDidMount() {
        // this.props.userInfoActions({ token: '123456' })

        this.init();
    }

}

function IndexList(props) {
    const { scrollEvent, records = [], type } = props;

    return <ul className="newlist" data-type={type} onScroll={scrollEvent}>
        {
            records.map((item, index) => {
                return (
                    <li
                        className="newlist-li"
                        key={item.productid + item.code + item.name + item.hot + index}
                        data-productid={item.productid}
                        data-salerid={item.salerid}
                    >
                        <div
                            className="newlist-li-img"
                            style={{ background: `url(${item.image}) no-repeat center` }}
                        >
                            <div className="newlist-li-shopcontent">
                                {item.tags.split(',').map((tag) => {
                                    let className = '';
                                    if (tag.indexOf('推荐') > -1) {
                                        className = 'tag recommend';
                                    } else if (tag.indexOf('上新') > -1) {
                                        className = 'tag shangxin';
                                    } else if (tag.indexOf('版权') > -1) {
                                        className = 'tag copyright';
                                    } else {
                                        className = 'tag all';
                                    }
                                    return <span key={item.productid + tag + item.name} className={className} style={{ display: className == 'tag all' ? 'none' : 'inline-block' }}>{tag.substr(0, 2)}</span>
                                })}
                            </div>
                            <div className="name">
                                {item.name}
                            </div>
                            <div className="hot">
                                <img src={love}></img>
                                <span>{item.hot}</span>
                            </div>
                        </div>

                    </li>
                )
            })
        }
    </ul>
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