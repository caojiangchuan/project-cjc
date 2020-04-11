import axios from 'axios';

let http = axios.create({
    baseURL: 'http://localhost:3000/',
    // 跨域请求是否携带cooikes
    timeout: 600000,
    withCredentials: false,
    // `headers` 是即将被发送的自定义请求头
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    // 允许在向服务器发送前，修改请求数据(form data数据)
    transformRequest: [function (data) {
        let newData = '';
        for (let k in data) {
            if (data.hasOwnProperty(k) === true) {
                newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
            }

        }
        return newData;
    }]
});
// 请求拦截器
// http.interceptors.request.use(
//     config => {
//         // 这里可以自定义一些config 配置, 比如添加token
//         const token = localStorage.getItem('token');
//         token && (config.headers.Authorization = 'Bearer ' + token);
//         return config;
//     }, function (error) {
//         return Promise.reject(error);
//     }
// );

// 响应拦截器
http.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
        // 否则的话抛出错误
        if (response.status === 200) {
            return Promise.resolve(response);
        }
        else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码    
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。                
                case 401:
                    // 
                    break;

                    // 403 token过期
                    // 登录过期对用户进行提示
                    // 清除本地token和清空vuex中token对象
                    // 跳转登录页面                
                case 403:

                    break;

                    // 404请求不存在
                case 404:
                    break;
                    // 其他错误，直接抛出错误提示
                default:
                    break;
            }
            return Promise.reject(error.response);
        }

    });
function apiAxios(method, url, params, response) {
    http({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null
    }).then(function (res) {
        response(res.data);
    }).catch(function (err) {
        response(err);
    });
}

export default {
    get: function (url, params, response) {
        return apiAxios('GET', url, params, response);
    },
    post: function (url, params, response) {
        return apiAxios('POST', url, params, response);
    },
    put: function (url, params, response) {
        return apiAxios('PUT', url, params, response);
    },
    delete: function (url, params, response) {
        return apiAxios('DELETE', url, params, response);
    }
}
