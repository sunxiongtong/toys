import * as actionTypes from '../constants/userInfo';
const initState = {
    title: '111'
};

export default function userInfo(state = initState, action) {
    switch (action.type) {
        case actionTypes.USERINFO_UPDATE:
            return action.data;
        default:
            return state;
    }
}