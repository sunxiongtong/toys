import { combineReducers } from 'redux'
import userinfo from './userInfo';
import brand from './brand';

export default combineReducers({
    userinfo,
    brand
})