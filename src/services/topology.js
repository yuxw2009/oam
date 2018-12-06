import { request, config } from '../utils'
const { api } = config
const { topology } = api

export async function query (params) {
  return request({
    url: topology,
    method: 'post',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: topology,
    method: 'put',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: topology,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: topology,
    method: 'put',
    data: params,
  })
}
