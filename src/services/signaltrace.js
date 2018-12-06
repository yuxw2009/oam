import { request, config } from '../utils'
const { api } = config
const { signaltrace, signaltrace_detail} = api

export async function query (params) {
  return request({
    url: signaltrace,
    method: 'post',
    data: params,
  })
}


export async function detail (params) {
  return request({
    url: signaltrace_detail,
    method: 'post',
    data: params,
  })
}