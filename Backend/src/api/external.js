import request from '@/utils/request'

export function getDoctorNames(query) {
  return request({
    url: '/api/external/getDoctorNames',
    method: 'get',
    params: query
  })
}
