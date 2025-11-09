import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
