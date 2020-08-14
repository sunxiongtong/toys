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
import My from './pages/My';
import Detail from './pages/Detail';
import Register from './pages/Register';
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
                        <Route path='/' component={Home} exact></Route>
                        <Route path='/my' component={My} exact></Route>
                        <Route path='/brand' component={Brand} exact></Route>
                        <Route path='/star' component={Star} exact></Route>
                        <Route path='/login' component={Login} exact></Route>
                        <Route path='/detail' component={Detail} exact></Route>
                        <Route path='/register' component={Register} exact></Route>
                        <MyTabBar></MyTabBar>
                    </Router>
                    
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
