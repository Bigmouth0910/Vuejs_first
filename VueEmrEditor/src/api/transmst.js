import request from '@/utils/request'

// 獲取
export function transmstInfo(query) {
  return request({
    url: '/api/transmst/transmstInfo',
    method: 'get',
    params: query
  })
}

// 新增
export function createTransmst(data) {
  return request({
    url: '/api/transmst/transmstInfo',
    method: 'post',
    data
  })
}
// 修改
export function updateTransmst(data) {
  return request({
    url: '/api/transmst/transmstInfo',
    method: 'put',
    data
  })
}
