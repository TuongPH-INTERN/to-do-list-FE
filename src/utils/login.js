import {HTTP} from './axios'

const post = (data) => {
  return HTTP.post('/login', data)
}

export {post}
