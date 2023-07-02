// 表單相關api
import request from '@/utils/request'

// 獲取表單
export function sheetInfo(query) {
  return request({
    url: '/api/sheet/sheetInfo',
    method: 'get',
    params: query
  })
}

// 新增表單
export function createSheet(data) {
  return request({
    url: '/api/sheet/sheetInfo',
    method: 'post',
    data
  })
}
// 修改表單
export function updateSheet(data) {
  return request({
    url: '/api/sheet/sheetInfo',
    method: 'put',
    data
  })
}
// 刪除表單
export function deleteSheet(id) {
  return request({
    url: '/api/sheet/sheetInfo/' + id,
    method: 'delete'
  })
}

export function countSheet(query) {
  return request({
    url: '/api/sheet/countsheet',
    method: 'get',
    params: query
  })
}
