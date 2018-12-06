import { request, config } from '../utils'
const { api } = config
const { bind } = api

export async function query (params) {
  return request({
    url: bind,
    method: 'post',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: bind,
    method: 'put',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: bind,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: bind,
    method: 'put',
    data: params,
  })
}
