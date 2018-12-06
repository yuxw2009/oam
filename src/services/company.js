import { request, config } from '../utils'
const { api } = config
const { company } = api

export async function query (params) {
  return request({
    url: company,
    method: 'post',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: company,
    method: 'put',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: company,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: company,
    method: 'put',
    data: params,
  })
}
