// 病历表單分類相關api
import request from '@/utils/request'

// 獲取病历表單分類
export function orderInfo(query) {
  return request({
    url: '/api/order/orderInfo',
    method: 'get',
    params: query
  })
}

// 新增病历表單分類
export function createOrder(data) {
  return request({
    url: '/api/order/orderInfo',
    method: 'post',
    data
  })
}
// 修改病历表單分類
export function updateOrder(data) {
  return request({
    url: '/api/order/orderInfo',
    method: 'put',
    data
  })
}
// 刪除病历表單分類
export function deleteOrder(id) {
  return request({
    url: '/api/order/orderInfo/' + id,
    method: 'delete'
  })
}
