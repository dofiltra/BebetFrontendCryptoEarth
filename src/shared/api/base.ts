import { API_URL } from '@/shared/config'
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'

class ApiInstance {
  private axios: AxiosInstance

  private _token: string | null = null

  constructor() {
    this.axios = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    this.init()
  }

  public init() {
    this.axios.interceptors.request.use((config) => {
      if (!this.token) {
        return config
      }
      config.headers['Authorization'] = this.token

      return config
    })
  }

  private get token() {
    if (this._token) {
      return this._token
    }

    const token = localStorage.getItem('token')

    if (token) {
      this._token = token
    }

    return this._token
  }

  async get<T>(
    endpoint: string,
    options: AxiosRequestConfig = {},
    events?: {
      onError?: (o: { error: any }) => Promise<void>
    }
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axios.get(endpoint, options)
      if (response?.status >= 400) {
        events?.onError({ error: response.statusText })
      }
      return response
    } catch (error) {
      events?.onError({ error })
      throw error
    }
  }

  async post<T>(endpoint: string, data: any, options: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axios.post(endpoint, data, options)
      return response
    } catch (error) {
      throw error
    }
  }

  async put<T>(endpoint: string, data: any, options: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axios.put(endpoint, data, options)
      return response
    } catch (error) {
      throw error
    }
  }

  async delete<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axios.delete(endpoint, options)
      return response
    } catch (error) {
      throw error
    }
  }
}

export const apiInstance = new ApiInstance()
