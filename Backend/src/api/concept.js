// 字典分類相關api
import request from '@/utils/request'

// 獲取字典分類
export function conceptInfo(query) {
  return request({
    url: '/api/concept/conceptInfo',
    method: 'get',
    params: query
  })
}

// 新增字典分類
export function createConcept(data) {
  return request({
    url: '/api/concept/conceptInfo',
    method: 'post',
    data
  })
}
// 修改字典分類
export function updateConcept(data) {
  return request({
    url: '/api/concept/conceptInfo',
    method: 'put',
    data
  })
}
// 刪除字典分類
export function deleteConcept(id) {
  return request({
    url: '/api/concept/conceptInfo/' + id,
    method: 'delete'
  })
}

export function countConcept(query) {
  return request({
    url: '/api/concept/countconcept',
    method: 'get',
    params: query
  })
}
