import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { apiHeaders, apiTimeout } from 'shared/constants/AppConst'

export const apiRequestConfig = {
  baseURL: process.env.REACT_APP_API_URL || location.origin,
  // baseURL: process.env.REACT_APP_API_URL,
  timeout: apiTimeout,
  headers: apiHeaders,
  withCredentials: true,
}

const axiosInstance: AxiosInstance = axios.create()
axios.defaults.withCredentials = true

class Api {
  
  static get(url: string, config: Partial<AxiosRequestConfig> = {}) {
    return axiosInstance.get(url, {
      ...apiRequestConfig,
      ...config
    })
  }


  static post(
    url: string,
    body?: any,
    config: Partial<AxiosRequestConfig> = {},
  ) {
    return axiosInstance.post(url, body, {
      ...apiRequestConfig,
      ...config,
    })
  }


  static put(
    url: string,
    body?: any,
    config: Partial<AxiosRequestConfig> = {},
  ) {
    return axiosInstance.put(url, body, {
      ...apiRequestConfig,
      ...config,
    })
  }

  static patch(
    url: string,
    body?: any,
    config: Partial<AxiosRequestConfig> = {},
  ) {
    return axiosInstance.patch(url, body, {
      ...apiRequestConfig,
      ...config,
    })
  }

  static delete(url: string, config: Partial<AxiosRequestConfig> = {}) {
    return axiosInstance.delete(url, {
      ...apiRequestConfig,
      ...config,
    })
  }
}

export { axiosInstance }
export default Api
