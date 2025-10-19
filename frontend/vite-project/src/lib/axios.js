import axios from 'axios'

const BASE_URL =
  import.meta.env.MODE === 'development' ? 'http://localhost:5001/api' : '/api'

const api = axios.create({
  baseURL: BASE_URL, // ← NO QUOTES! This must be the variable, not string
})

export default api
