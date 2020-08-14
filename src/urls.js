//http://www.dolltoys.cn:15000/swagger-ui.html#/product-controller/getListByTagUsingPOST
//http://www.dolltoys.cn/#/client/home

let domain = '';

switch (process.env.env) {
    case 'dev':
        domain = 'http://dolltoys.exfox.com.cn:15000';
    default:
        domain = 'http://dolltoys.exfox.com.cn:15000';
}

const shop = {
    getListByTag: `${domain}/api/product/getListByTag`,
    getConfigClassify:`${domain}/api/config/getConfig`,
    getFileLoad:`${domain}/api/product/fileLoad`,
    getLoad:`${domain}/api/product/load`,
    getSkuLoad:`${domain}/api/product/skuLoad`,
    getLoadInfo:`${domain}/api/saler/loadInfo`,
}
const banner = {
    getBanner:`${domain}/api/banner/getList`,
    // getBrand:`${domain}/api/banner/getList`
}

const user = {
    login:`${domain}/api/user/login`,
    register:`${domain}/api/user/reg`
}
export {
    shop,
    banner,
    user
}