import request from '../util/request';

// 登陆接口
export function code2session(params){
    return request.post('/user/code2session', params)
}

// 生物认证
export function fingerVerify(params){
    return request.post('/user/fingerPrint', params);
}

// 解密数据
export function userDecrypt(params){
    return request.post('/user/decrypt', params);
}