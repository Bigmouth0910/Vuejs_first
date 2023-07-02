import request from '@/utils/request'

// 獲取
export function transdtlInfo(query) {
  return request({
    url: '/api/transdtl/transdtlInfo',
    method: 'get',
    params: query
  })
}

// 新增
export function createTransdtl(data) {
  return request({
    url: '/api/transdtl/transdtlInfo',
    method: 'post',
    data
  })
}
// 修改
export function updateTransdtl(data) {
  return request({
    url: '/api/transdtl/transdtlInfo',
    method: 'put',
    data
  })
}

export function deleteTransdtl(sheetid) {
  return request({
    url: '/api/transdtl/transdtlInfo/' + sheetid,
    method: 'delete'
  })
}

