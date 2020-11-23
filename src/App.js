import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route,hashHistory } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';
import Home from './pages/Home';
import Login from './pages/Login';
import Brand from './pages/Brand';
import BrandList from './pages/BrandList';
import Star from './pages/Star';
import My from './pages/My';
import Detail from './pages/Detail';
import Register from './pages/Register';
import SearchPage from './pages/SearchPage';
import Privacy from './pages/Privacy';
import Agreement from './pages/Agreement';
import 'antd-mobile/dist/antd-mobile.css';
import MyTabBar from '@/pages/Tabbar';

// store.getState() 

class App extends React.Component {

    render() {
        const { store } = this.props;

        return (
            <Provider store={store}>
                <div className="App">
                    <Router basename='/' history={hashHistory}>
                   
                        <CacheRoute path='/' exact component={Home} className="cache-div"></CacheRoute>
                        <Route path='/my' component={My} exact></Route>
                        <CacheRoute path='/brand' component={Brand} exact className="cache-div"></CacheRoute>
                        <CacheRoute path='/brandlist' component={BrandList} exact></CacheRoute>
                        <Route path='/star' component={Star} exact></Route>
                        <Route path='/login' component={Login} exact></Route>
                        <Route path='/detail' component={Detail} exact></Route>
                        <Route path='/register' component={Register} exact></Route>
                        <Route path='/searchpage' component={SearchPage} exact></Route>
                        <Route path='/agreement' component={Agreement} exact></Route>
                        <Route path='/privacy' component={Privacy} exact></Route>
                        <MyTabBar></MyTabBar>
                     
                    </Router>

                </div>
            </Provider >
        );
    }

}

const root = document.getElementById('root');
ReactDOM.render(
    // <React.StrictMode>
    <App store={store} />
    // </React.StrictMode>
    ,
    root
);

export default App;
