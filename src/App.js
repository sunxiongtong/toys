import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';
import Home from './pages/Home';
import Login from './pages/Login';
import Brand from './pages/Brand';
import Star from './pages/Star';
import 'antd-mobile/dist/antd-mobile.css';
import MyTabBar from '@/components/Tabbar';

console.log(store.getState())

class App extends React.Component {
    history = React.createRef();
    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <div className="App">
                    <Router basename='/' ref={this.history}>
                        <Route path='/' component={Home} exact></Route>
                        <Route path='/login' component={Login} exact></Route>
                        <Route path='/brand' component={Brand} exact></Route>
                        <Route path='/star' component={Star} exact></Route>
                    </Router>
                    <MyTabBar history={this.history}></MyTabBar>
                </div>
            </Provider>
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
