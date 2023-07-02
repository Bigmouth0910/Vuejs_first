// 数据元分類相關api
import request from '@/utils/request'

// 獲取数据元分類
export function codemstInfo(query) {
  return request({
    url: '/api/codemst/codemstInfo',
    method: 'get',
    params: query
  })
}

// 新增数据元分類
export function createCodemst(data) {
  return request({
    url: '/api/codemst/codemstInfo',
    method: 'post',
    data
  })
}
// 修改数据元分類
export function updateCodemst(data) {
  return request({
    url: '/api/codemst/CodemstInfo',
    method: 'put',
    data
  })
}
// 刪除数据元分類
export function deleteCodemst(code_type) {
  return request({
    url: '/api/codemst/codemstInfo/' + code_type,
    method: 'delete'
  })
}

export function countCodemst(query) {
  return request({
    url: '/api/codemst/countcodemst',
    method: 'get',
    params: query
  })
}
