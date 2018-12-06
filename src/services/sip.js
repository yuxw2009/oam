import { request, config } from '../utils'
const { api } = config
const { sip } = api

export async function query (params) {
  return request({
    url: sip,
    method: 'post',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: sip,
    method: 'put',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: sip,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: sip,
    method: 'put',
    data: params,
  })
}
