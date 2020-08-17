import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
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


console.log(store.getState())

class App extends React.Component {

    render() {
        const { store } = this.props;

        return (
            <Provider store={store}>
                <div className="App">
                    <Router basename='/'>
                        <Route path='/' exact >
                            {props => {
                                return (<div style={props.match ? null : { display: 'none' }} className="home">
                                    <Home {...props} />
                                </div>)
                            }}
                        </Route>
                        <Route path='/my' component={My} exact></Route>
                        <Route path='/brand' component={Brand} exact></Route>
                        <Route path='/brandlist' component={BrandList} exact></Route>
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

ReactDOM.render(
    // <React.StrictMode>
    <App store={store} />
    // </React.StrictMode>
    ,
    document.getElementById('root')
);


export default App;
