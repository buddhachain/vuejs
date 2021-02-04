import { baseURL } from './env'

const request = (params) => {
    console.log(params)
    return new Promise((resolve, reject) => {
        uni.request({
           ...params,
           success: resolve,
           fail: reject
        });
    })
}


class Request {
    constructor (config) {
        this._headers = config._headers || {
            'Content-Type': 'application/json'
        };
        this._timeout = config.timeout || 12000;
        this._baseURL = config.baseURL || ''; 
    }
    req (path='', data={}, method='GET', config={}) {
        if (!config.header) {
            config.header = this._headers;
        }
        if (!config.timeout) {
            config.timeout = this._timeout
        }
        const param = {
            url: this._baseURL + path,
            data,
            method,
            ...config
        }
        return request(Object.assign(param))
    }

    get (url, data, config) {
        return this.req(url, data, 'GET', config)
    }

    post (url, data, config) {
        return this.req(url, data, 'POSt', config)
    }
}

export const http = new Request({
    baseURL
})
