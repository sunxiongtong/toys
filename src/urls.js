//http://www.dolltoys.cn:15000/swagger-ui.html#/product-controller/getListByTagUsingPOST
//http://www.dolltoys.cn/#/client/home

let domain = '';
console.log(process.env)
switch (process.env.env) {
    case 'dev':
        domain = 'http://dolltoys.exfox.com.cn:15000';
    default:
        domain = 'http://dolltoys.exfox.com.cn:15000';
}

const shop = {
    getListByTag: `${domain}/api/product/getListByTag`,
}

export {
    shop
}