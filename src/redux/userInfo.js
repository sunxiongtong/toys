import * as actionTypes from '../constants/userInfo';

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

let token = getCookie('token') || '';
// console.log(getCookie('token'))
const initState = {
    token: token,
    phone:'',
};

export default function userInfo(state = initState, action) {
    switch (action.type) {
        case actionTypes.USERINFO_UPDATE:
            return {
                ...state,
                token:action.data
            };
        case actionTypes.USERINFO_PHONE:
            return {
                ...state,
                phone:action.data
            }
        default:
            return state;
    }
}