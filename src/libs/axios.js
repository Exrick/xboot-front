import axios from 'axios';
import { getStore, setStore } from './storage';
import { router } from '../router/index';
import { Message } from 'view-design';
import Cookies from 'js-cookie';
// 统一请求路径前缀
let base = '/xboot';
// 超时设定
axios.defaults.timeout = 15000;

axios.interceptors.request.use(config => {
    return config;
}, err => {
    Message.error('请求超时');
    return Promise.resolve(err);
});

// http response 拦截器
axios.interceptors.response.use(response => {
    const data = response.data;

    // 根据返回的code值来做不同的处理(和后端约定)
    switch (data.code) {
        case 401:
            // 未登录 清除已登录状态 清除锁屏状态
            Cookies.set('userInfo', '');
            Cookies.set("locking", "0");
            setStore('accessToken', '');
            if (router.history.current.name != "login") {
                if (data.message !== null) {
                    Message.error(data.message);
                } else {
                    Message.error("未知错误，请重新登录");
                }
                router.push('/login');
            }
            break;
        case 403:
            // 没有权限
            if (data.message !== null) {
                Message.error(data.message);
            } else {
                Message.error("未知错误");
            }
            break;
        case 500:
            // 错误
            if (data.message !== null) {
                Message.error(data.message);
            } else {
                Message.error("未知错误");
            }
            break;
        default:
            return data;
    }

    return data;
}, (err) => {
    // 返回状态码不为200时候的错误处理
    Message.error(err.toString());
    return Promise.resolve(err);
});

export const getRequest = (url, params) => {
    let accessToken = getStore('accessToken');
    return axios({
        method: 'get',
        url: `${base}${url}`,
        params: params,
        headers: {
            'accessToken': accessToken
        }
    });
};

export const postRequest = (url, params) => {
    let accessToken = getStore("accessToken");
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            ret = ret.substring(0, ret.length - 1);
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accessToken': accessToken
        }
    });
};

export const putRequest = (url, params) => {
    let accessToken = getStore("accessToken");
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            ret = ret.substring(0, ret.length - 1);
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accessToken': accessToken
        }
    });
};

export const postBodyRequest = (url, params) => {
    let accessToken = getStore('accessToken');
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: {
            'accessToken': accessToken
        }
    });
};

/**
 * 无需token验证的GET请求 避免旧token过期导致请求失败
 * @param {*} url
 * @param {*} params
 */
export const getNoAuthRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        params: params
    });
};

export const postNoAuthRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            ret = ret.substring(0, ret.length - 1);
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

export const deleteRequest= (url,params) =>{
    console.log(params)
    let accessToken = getStore("accessToken");
    return axios({
        method: 'delete',
        url: `${base}${url}/${params.ids}`,
        transformRequest: [function (data) {
            console.log(data)
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            ret = ret.substring(0, ret.length - 1);
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accessToken': accessToken
        }
    });
}
