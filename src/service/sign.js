import request from '../util/request';

// 添加面试
export function addSign(params) {
  return request.post('/sign', params);
}

// 获取面试列表
export function getSignList(params) {
  return request.get('/sign', params);
}

// 获取面试列表详情
export function getInterviewDetail(params) {
  return request.get(`/sign/${params.id}`);
}

// 更新面试信息
export function upInterviewDetail(params) {
  return request.put(`/sign/${params.id}`, {
    remind: params.remind,
    status: params.status
  });
}