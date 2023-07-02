// 数据元相關api
import request from '@/utils/request'

// 獲取数据元
export function codedtlInfo(query) {
  return request({
    url: '/api/codedtl/codedtlInfo',
    method: 'get',
    params: query
  })
}

// 新增数据元
export function createCodedtl(data) {
  return request({
    url: '/api/codedtl/codedtlInfo',
    method: 'post',
    data
  })
}
// 修改数据元
export function updateCodedtl(data) {
  return request({
    url: '/api/codedtl/codedtlInfo',
    method: 'put',
    data
  })
}
// 刪除数据元
export function deleteCodedtl(id) {
  return request({
    url: '/api/codedtl/codedtlInfo/' + id,
    method: 'delete'
  })
}

export function countCodedtl(query) {
  return request({
    url: '/api/codedtl/countcodedtl',
    method: 'get',
    params: query
  })
}
