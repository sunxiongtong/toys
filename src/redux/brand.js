import * as actionTypes from '../constants/brand';
const initState = {
    brandList: []
};

export default function getBrandList(state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_BRANDLIST:
            return {
                ...state,
                brandList:action.data
            };
        default:
            return state;
    }
}