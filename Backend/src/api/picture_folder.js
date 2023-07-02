// 圖分類相關api
import request from '@/utils/request'

// 獲取圖分類
export function pictureFolderInfo(query) {
  return request({
    url: '/api/picture/pictureFolderInfo',
    method: 'get',
    params: query
  })
}

// 新增圖分類
export function createPictureFolder(data, header) {
  return request({
    url: '/api/picture/pictureFolderInfo',
    method: 'post',
    data
  })
}

// 修改圖分類
export function updatePictureFolder(data, header) {
  return request({
    url: '/api/picture/pictureFolderInfo',
    method: 'put',
    data
  })
}

// 刪除圖分類
export function deletePictureFolder(id) {
  return request({
    url: '/api/picture/pictureFolderInfo/' + id,
    method: 'delete'
  })
}
