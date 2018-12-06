import { request, config } from '../utils'
const { api } = config
const { phone, ax } = api

export async function query (params) {
  return request({
    url: phone,
    method: 'post',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: phone,
    method: 'put',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: phone,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: phone,
    method: 'put',
    data: params,
  })
}

export async function bind (params) {
  return request({
    url: ax,
    method: 'put',
    data: params,
  })
}
