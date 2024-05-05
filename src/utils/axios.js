import axios from 'axios'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vdG8tZG8tbGlzdC50ZXN0L2FwaS9sb2dpbiIsImlhdCI6MTcxNDkwNjQ0MSwiZXhwIjoxNzE0OTEwMDQxLCJuYmYiOjE3MTQ5MDY0NDEsImp0aSI6IjF1Q3VFTVI1UjFGbXhzRGIiLCJzdWIiOiIyMCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.4HJKomWmyGcBVVc7JQHBtN71enNXh6r6c9aFt6PSNr0'
export const HTTP = axios.create({
  baseURL: `http://to-do-list.test/api/`,
  headers: {
    'Authorization': 'Bearer' + token,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
