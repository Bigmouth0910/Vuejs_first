// 圖分類相關api
import request from '@/utils/request'

// 獲取圖分類
export function pictureInfo(query) {
  return request({
    url: '/api/picture/pictureInfo',
    method: 'get',
    params: query
  })
}

// 新增圖分類
export function createPicture(data, header) {
  if (header) {
    return request({
      url: '/api/picture/pictureInfo',
      method: 'post',
      data,
      headers: header
    })
  } else {
    return request({
      url: '/api/picture/pictureInfo',
      method: 'post',
      data
    })
  }
}

// 修改圖分類
export function updatePicture(data, header) {
  if (header) {
    return request({
      url: '/api/picture/pictureInfo',
      method: 'put',
      data,
      headers: header
    })
  } else {
    return request({
      url: '/api/picture/pictureInfo',
      method: 'put',
      data
    })
  }
}

// 刪除圖分類
export function deletePicture(id) {
  return request({
    url: '/api/picture/pictureInfo/' + id,
    method: 'delete'
  })
}

export function countPicture(query) {
  return request({
    url: '/api/picture/countpicture',
    method: 'get',
    params: query
  })
}
