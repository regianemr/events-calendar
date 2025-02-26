import axios from 'axios'
import UserService from './UserService'

const userService = new UserService()

export default class EventService {
  constructor () {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_LOGIN + '/events'
    })
  }

  async update ({id, title, start, end, description, color, type}) {
    const accessToken = userService.getUserToken()
    return this.axios.put(`/${id}`, {title, start, end, description, color, type},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, 
      },
    }
  )
  }

  async create ({title, start, end, description, color, type}) {
    const accessToken = userService.getUserToken()
    return this.axios.post('/', {title, start, end, description, color, type},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, 
      },
    }
  )
  }

  async list () {
    const accessToken = userService.getUserToken()
    return this.axios.get('/',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    )
  }

  async delete ({id}) {
    const accessToken = userService.getUserToken()
    return this.axios.delete(`/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, 
      },
    }
  )
  }
}

