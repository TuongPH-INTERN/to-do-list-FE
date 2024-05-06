import axios from 'axios'
const token = localStorage.getItem('token')
export const HTTP = axios.create({
  baseURL: `http://todolist.test/api/`,
  headers: {
    'Authorization': 'Bearer' + token,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
