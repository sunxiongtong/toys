import * as actionsTypes from '../constants/brand';

export const getBrandList= (data)=>{
    return {
        type:actionsTypes.GET_BRANDLIST,
        data
    }
}

