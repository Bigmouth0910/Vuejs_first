import request from '@/utils/request'

export function getDoctorNames(query) {
  return request({
    url: '/api/external/getDoctorNames',
    method: 'get',
    params: query
  })
}

export function getBasicInfos(query) {
  return request({
    url: '/api/external/getBasicInfos',
    method: 'get',
    params: query
  })
}
