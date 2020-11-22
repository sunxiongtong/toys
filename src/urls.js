//http://www.dolltoys.cn:15000/swagger-ui.html#/product-controller/getListByTagUsingPOST
//http://www.dolltoys.cn/#/client/home

let domain = '';

switch (process.env.env) {
    case 'dev':
        domain = 'http://dolltoys.exfox.com.cn:15000';
    default:
        domain = 'http://service.dolltoys.cn';
}

const shop = {
    getListByTag: `${domain}/api/product/getListByTag`,
    getConfigClassify:`${domain}/api/config/getConfig`,
    getFileLoad:`${domain}/api/product/fileLoad`,
    getLoad:`${domain}/api/product/load`,
    getSkuLoad:`${domain}/api/product/skuLoad`,
    getLoadInfo:`${domain}/api/saler/loadInfo`,
    isFocus:`${domain}/api/focus/load`,
    focusAdd:`${domain}/api/focus/add`,
    focusRemove:`${domain}/api/focus/remove`,
    star:`${domain}/api/focus/getProductList`,
    search:`${domain}/api/product/getListByKey`,
}
const banner = {
    getBanner:`${domain}/api/banner/getList`,
    getListBySaler:`${domain}/api/product/getListBySaler`
    // getBrand:`${domain}/api/banner/getList`
}

const user = {
    login:`${domain}/api/user/login`,
    register:`${domain}/api/user/reg`,
    get:`${domain}/api/user/get`,
}
export {
    shop,
    banner,
    user
}