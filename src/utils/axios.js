import axios from 'axios'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vdG9kb2xpc3QudGVzdC9hcGkvbG9naW4iLCJpYXQiOjE3MTQ5Nzk2MTcsImV4cCI6MTcxNDk4MzIxNywibmJmIjoxNzE0OTc5NjE3LCJqdGkiOiIzbHB3VXB1WDZLMWdQdHhIIiwic3ViIjoiMTAwIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.QMxUtWe-uPbkKvZl0hCqV4fGBfxZGrED-I-eHSUo3v0'
export const HTTP = axios.create({
  baseURL: `http://todolist.test/api/`,
  headers: {
    'Authorization': 'Bearer' + token,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
