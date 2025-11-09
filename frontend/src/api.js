import axios from 'axios'

const API_BASE_URL = 'http://localhost:8081/api' // <- change this to your deployed URL later

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// fetch all expenses
export const fetchExpenses = () => api.get('/expenses').then(r => r.data)

// add expense
export const addExpense = (expense) => api.post('/expenses', expense).then(r => r.data)
