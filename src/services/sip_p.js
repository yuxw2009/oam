import { request, config } from '../utils'
const { api } = config
const { sip_p } = api

export async function query (params) {
  return request({
    url: sip_p,
    method: 'post',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: sip_p,
    method: 'put',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: sip_p,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: sip_p,
    method: 'put',
    data: params,
  })
}
