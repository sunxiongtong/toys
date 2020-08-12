import axios from 'axios';

// 封装到一个对象中
let https = {
    get(url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.data)
            })
        })
    },
    post(url, params={"oToken":"367418cb-9398-4fcd-9dde-4b6b9c685a08","tag":"上新专区","pageindex":1,"pagesize":21,"pages":1}, json) {
        let headers = {};
        //     data;
        // headers['Content-type'] = json ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=UTF-8';
        // data = json ? params : QS.stringify(params);
        return new Promise((resolve, reject) => {
            axios.post(url, params, { headers: headers })
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err.data)
                })
        })
    }
}

export default https;