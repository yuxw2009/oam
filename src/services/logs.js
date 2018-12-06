import { request, config } from '../utils'
const { api } = config
const { logs } = api

export async function query (params) {
  return request({
    url: logs,
    method: 'post',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: logs,
    method: 'put',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: logs,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: logs,
    method: 'put',
    data: params,
  })
}
