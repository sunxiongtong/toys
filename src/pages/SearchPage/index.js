import React from 'react' ;
import SearchList from '@/components/SearchList/index';
import http from '@/http.js';
import { connect } from 'react-redux';
import { shop, banner } from '@/urls.js';
import NavBar from '@/components/NavBar';
import './index.scss';
import { Button, SearchBar, Tabs, Badge, Toast } from 'antd-mobile';

class SearchPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            records:[]
        };

        this.pageSize = 100;
        this.pageObj = {
            page:1,
            totalPages:undefined
        }
    }

    getRecord(key){
        let pageObj = this.pageObj || {};
        // if (pageObj.totalPages && pageObj.page > pageObj.totalPages) return;

        let params = {
            oToken: this.props.token,
            key,
            pageindex: pageObj.page,
            pagesize: this.pageSize,
        }

        http.post(shop.search, params).then((res) => {
            const { data, status, message } = res;

            const { list, pages } = data;
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
                    records: [...list]
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
            //滑动到底部调接口 某些浏览器可能设置缩放 导致像素不是整数 + 1 防止这些误差
            if (scrollHeight - scrollTop <= clientHeight + 1) {
                this.getRecord(this.id);
            }
            clearTimeout(this.timeout);

        }, 50)
    }

    render(){
        const {records=[]}=this.state;

        return <div className="brandlist searchpage">
            <div className="navwrap">
                <NavBar title='查找商品' showIcon={true}></NavBar>
            </div>
            
            <div className="list-wrap">
                <div className="input-wrap">
                    <input placeholder="输入商品" ref={el=>this.inp=el}/>
                    <span onClick={()=>{
                        let value = this.inp.value;
                        this.getRecord(value);
                    }}>搜索</span>
                </div>
                <SearchList records={records} scrollEvent={this.handleScroll.bind(this)}></SearchList>
            </div>
        </div>
    }

    componentDidMount(){
       
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