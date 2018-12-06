import { request, config } from '../utils'
const { api } = config
const { traffic } = api

export async function query (params) {
  return request({
    url: traffic,
    method: 'post',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: traffic,
    method: 'put',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: traffic,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: traffic,
    method: 'put',
    data: params,
  })
}
