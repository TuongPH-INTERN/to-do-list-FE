import {HTTP} from './axios'

const get = () => {
  return HTTP.get('/task')
}

const post = (data) => {
  return HTTP.post('/task', data)
}

const put = (id, data) => {
  return HTTP.put(`/task/${id}`, data)
}

const show = (id) => {
  return HTTP.get(`/task/${id}`)
}

const destroy = (id) => {
  return HTTP.delete(`/task/${id}`)
}

export {get, post, put, show, destroy}
