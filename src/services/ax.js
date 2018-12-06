import { request, config } from '../utils'
const { api } = config
const { ax, bind, phone} = api

export async function query (params) {
  return request({
    url: ax,
    method: 'post',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: ax,
    method: 'put',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: ax,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: ax,
    method: 'put',
    data: params,
  })
}

export async function bind_b (params) {
  return request({
    url: bind,
    method: 'put',
    data: params,
  })
}

export async function getX (params) {
  return request({
    url: phone,
    method: 'post',
    data: params,
  })
}