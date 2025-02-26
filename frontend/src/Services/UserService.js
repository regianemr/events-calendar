import axios from 'axios'

export default class UserService {
  constructor () {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_LOGIN + '/auth'
    })
  }

  async login ({email, password}) {
    const {data} = await this.axios.post('/login', {email, password})
    if (data) {
      localStorage.setItem("token", data.token)
      return true
    }
    
    return false
  }

  async register ({name, email, password, confirmPassword}){
    return this.axios.post('/register', {name, email, password, confirmPassword}, {
      headers: {
        "Content-Type": "application/json" ,
      },
    })
  }

  authenticatedUser() {
    return !!localStorage.getItem("token") 
  }

  getUserToken() {
    return localStorage.getItem("token") 
  }
}

