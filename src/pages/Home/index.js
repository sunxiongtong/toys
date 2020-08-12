import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userInfoActionsFromOtherFile from '../../actions/userinfo.js'
import http from '@/http.js';
import { shop } from '@/urls.js'
import { Button, SearchBar, Tabs, Badge,Toast } from 'antd-mobile';
import './index.scss'
// import SearchList from '@/components/SearchList/index.js';

const tabs = [
    { title: <Badge >推荐专区</Badge> },
    { title: <Badge >上新专区</Badge> },
    { title: <Badge >版权品牌</Badge> },
    { title: <Badge >全部商品</Badge> },
];

const tabs2 = [
    { title: 'First Tab', sub: '1' },
    { title: 'Second Tab', sub: '2' },
    { title: 'Third Tab', sub: '3' },
    { title: 'Third Tab', sub: '4' },
];

class Home extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            recordsA:[],
            recordsB:[],
            recordsC:[],
            recordsD:[],
            
        }

        this.pageSize = 5;
        // A - 推荐专区
        this.pageObjA = {
            page: 1,
            totalPages: undefined
        }
        // B - 上新专区
        this.pageObjB = {
            page: 1,
            totalPages: undefined
        }
        // C - 版权品牌
        this.pageObjC = {
            page: 1,
            totalPages: undefined
        }
        // D - 全部商品
        this.pageObjD = {
            page: 1,
            totalPages: undefined
        }
    }

    getRecord(type) {
        // if (this.isSubmit) return;

        

        let tag = '推荐专区';
        let pageObj = this.pageObjA;

        switch(type){
            case 'A':
                tag = "推荐专区";
                pageObj = this.pageObjA;
                break;
            case 'B':
                tag = '上新专区';
                pageObj = this.pageObjA;
                break;
            case 'C':
                tag = '版权品牌';
                pageObj = this.pageObjA;
                break;
            case 'D':
                tag = '全部商品';
                pageObj = this.pageObjA;
                break;
        }
        console.log(pageObj.page,pageObj.totalPages)
        if (pageObj.page === pageObj.totalPages) return;

        let params = {
            oToken:'',
            tag,
            pageindex:pageObj.page,
            pagesize:this.pageSize,
        }


        http.post(shop.getListByTag,params).then((res)=>{
            const {data,status,message} = res;

            const {list,pages} = data;

            

            if(status != 'OK' && message != ''){
                Toast.info(message, 3);
                return ;
            }
            console.log(data)
            this.setState((preState)=>{
                return {
                    [`records${type}`]:[...preState[`records${type}`],...list]
                }
            });
            pageObj.page++;
            pageObj.totalPages = pages;
        })
      
    }

    //滚轮事件
    handleScroll(e) {
        const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
        const type = e.currentTarget.dataset.type;
        //滑动到底部调接口
        if (scrollHeight - scrollTop <= clientHeight) {
            this.getRecord(type);
        }
       
    }


    render() {
        const {recordsA = []} = this.state;
        return <div className="home">
            <SearchBar placeholder="Search" maxLength={8} />
            <div>
                <Tabs tabs={tabs}
                    initialPage={0}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                    <div className="slide">
                        <ul className="list" data-type='A' onScroll={this.handleScroll.bind(this)}>
                            {
                                recordsA.map(item => {
                                    return (
                                        <li key={item.productid + item.code}>
                                            <img src={item.image}></img>
                                        </li>
                                    )
                                })
                            }
                        </ul>

                    </div>
                    <div  className="slide">
                        2
                    </div>
                    <div  className="slide">
                        3
                    </div>
                    <div  className="slide">
                        4
                    </div>
                </Tabs>
            </div>
        </div>
    }

    componentDidMount() {
        this.props.userInfoActions({ title: '123456' })

        this.getRecord('A');
        
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