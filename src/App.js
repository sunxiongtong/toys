import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';
import Home from './pages/Home';
import Login from './pages/Login';
import 'antd-mobile/dist/antd-mobile.css';

console.log(store.getState())

class App extends React.Component {

    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <div className="App">
                    <Router basename='/'>

                            <Route path='/' component={Home} exact></Route>
                            <Route path='/login' component={Login} exact></Route>
           
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
