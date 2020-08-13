import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userInfoActionsFromOtherFile from '../../actions/userinfo.js'
import http from '@/http.js';
import { shop } from '@/urls.js'
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
            
        }

        this.pageSize = 5;
    }

    getRecord(type) {
        let tag = this.state[`type${type}`].text;
        let pageObj = this[`pageObj${type}`];
        // console.log(this,pageObj)
        // console.log(pageObj.page, pageObj.totalPages,pageObj)
        if (pageObj.totalPages && pageObj.page > pageObj.totalPages) return;

        let params = {
            oToken: '',
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
            },()=>{
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
        e.stopPropagation();
        // console.log(scrollHeight,scrollTop,scrollHeight-scrollTop,clientHeight)
        //滑动到底部调接口
        if (scrollHeight - scrollTop <= clientHeight) {
            this.getRecord(type);
        }
    }

    handleTabChange(index) {
        
        if (this.state[`records${index+1}`].length > 0) {
            return;
        }

        this.getRecord(index+1);
    }

    render() {
        const { configType = [] } = this.state;

        return <div className="home">
            <div onClick={()=>{this.props.history.push('/login')}}>
                <SearchBar placeholder="搜索商品" maxLength={8} disabled	/>
            </div>
            <Banner></Banner>
            <div className='tab-wrap'>
                <Tabs tabs={tabs}
                    initialPage={0}
                    onChange={(tab, index) => { this.handleTabChange(index); }}
                >
                    {
                        configType.length > 0 && configType.map((config)=>{
                            return (
                                <div className="slide" key={config.name+config.text}>
                                    <SearchList records={this.state[`records${config.name}`]} type={config.name} scrollEvent={this.handleScroll.bind(this)}></SearchList>
                                </div>
                            )
                        })
                    }
                </Tabs>
            </div>
        </div>
    }

    componentDidMount() {
        this.props.userInfoActions({ title: '123456' })

        http.post(shop.getConfigClassify, { name: 'tags', oToken: '' }).then((res) => {
            const { data } = res;
            const value = JSON.parse(data.value);

            this.setState({
                configType:value
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

}

export default connect(
    state => ({
        title: state.userinfo.title
    }),
    {
        userInfoActions: userInfoActionsFromOtherFile.updateTitle
    }
)(Home)