import { TabBar } from 'antd-mobile';
import React from 'react';

import home from '@/assets/home.svg';
import homeActive from '@/assets/homeActive.svg';
import star from '@/assets/star.svg';
import starActive from '@/assets/starActive.svg';

class MyTabBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'home',
            hidden: false,
            fullScreen: true,
        };
    }

    renderContent(pageText) {
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
                <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
                    onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                            hidden: !this.state.hidden,
                        });
                    }}
                >
                    Click to show/hide tab-bar
        </a>
                <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
                    onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                            fullScreen: !this.state.fullScreen,
                        });
                    }}
                >
                    Click to switch fullscreen
        </a>
            </div>
        );
    }

    render() {
        return (
            <div style={this.state.fullScreen ? { position: 'fixed', height: '10vh', width: '100%', bottom: 0 } : { height: 50 }}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="首页"
                        key="home"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${home}) center center /  21px 21px no-repeat`
                        }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${homeActive}) center center /  21px 21px no-repeat`
                        }}
                        />
                        }
                        selected={this.state.selectedTab === 'home'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'home',
                            },()=>{
                                this.history.push('/');
                            });
                        }}
                        data-seed="logId"
                    >
                   
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        title="品牌"
                        key="brand"
                        selected={this.state.selectedTab === 'brand'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'brand',
                            },()=>{
                                this.history.push('/brand');
                            });
                        }}
                        data-seed="logId1"
                    >
                        
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(${star}) center center /  21px 21px no-repeat`
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(${starActive}) center center /  21px 21px no-repeat`
                            }}
                            />
                        }
                        title="收藏"
                        key="star"
                        selected={this.state.selectedTab === 'star'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'star',
                            },()=>{
                                this.history.push('/star');
                            });
                        }}
                    >
                       
                    </TabBar.Item>
                    <TabBar.Item
                        icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg' }}
                        selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg' }}
                        title="我的"
                        key="my"
                        selected={this.state.selectedTab === 'my'}
                        onPress={() => {

                            this.setState({
                                selectedTab: 'my'
                            },()=>{
                                this.history.push('/login');
                            })
                            
                        }}
                    >
                      
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }

    componentDidMount() {
        this.history = this.props.history.current.history;
    }
}

export default MyTabBar;