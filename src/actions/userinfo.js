import * as actionsTypes from '../constants/userInfo';

export const login= (data)=>{
    return {
        type:actionsTypes.USERINFO_LOGIN,
        data
    }
}

export const updateTitle = (data)=>{
    return {
        type:actionsTypes.USERINFO_UPDATE,
        data
    }
}
