// 字典相關api
import request from '@/utils/request'

// 獲取字典
export function conceptdataInfo(query) {
  return request({
    url: '/api/conceptdata/conceptdataInfo',
    method: 'get',
    params: query
  })
}

// 新增字典
export function createConceptdata(data) {
  return request({
    url: '/api/conceptdata/conceptdataInfo',
    method: 'post',
    data
  })
}
// 修改字典
export function updateConceptdata(data) {
  return request({
    url: '/api/conceptdata/conceptdataInfo',
    method: 'put',
    data
  })
}
// 刪除字典
export function deleteConceptdata(id) {
  return request({
    url: '/api/conceptdata/conceptdataInfo/' + id,
    method: 'delete'
  })
}

export function countConceptdata(query) {
  return request({
    url: '/api/conceptdata/countconceptdata',
    method: 'get',
    params: query
  })
}
