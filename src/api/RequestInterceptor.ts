import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { onLogout } from "redux/actions/Auth";
import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS } from "shared/constants/ActionTypes";
import { axiosInstance } from "./Request";

const cancelTokens: { [k: string]: CancelTokenSource | null } = {}
let cancelTokensIndex = 'DEFAULT'

export class AxiosRequestCancleToken {
  static cancel(key: string = 'DEFAULT') {
    cancelTokens?.[key]?.cancel()
  }

  static setIndex(key: string = 'DEFAULT') {
    cancelTokensIndex = key
  }

  static getToken() {
    if (!cancelTokens[cancelTokensIndex]) this.generate(cancelTokensIndex)
    return cancelTokens?.[cancelTokensIndex]?.token
  }

  static generate(key: string = 'DEFAULT') {
    const source = axios.CancelToken.source()
    if (key) cancelTokens[key] = source
    else cancelTokens['DEFAULT'] = source
    this.setIndex(key)
  }
}

const useRequestInterceptor = () => {
  const { messages } = useIntl()
  const dispatch = useDispatch()
  const [ready, setReady] = useState(false)
  
  useEffect(() => {
    const apiRequestInterceptor = (config: AxiosRequestConfig) => {
      config.cancelToken = AxiosRequestCancleToken.getToken()
      AxiosRequestCancleToken.setIndex()
      const {REQUEST_MUTED} = config as any
      if (!REQUEST_MUTED)
        dispatch({type: FETCH_START})
      return config
    }

    const apiSuccessResponseInterceptor = (
      response: AxiosResponse,
    ): AxiosResponse['data'] => {
      const {REQUEST_MUTED} = response.config as any
      if (!REQUEST_MUTED)
        dispatch({type: FETCH_SUCCESS})
      return response.data
    }
    
    const apiFailureResponseInterceptor = (error: any) => {
      const response = error.response || {}
      const {REQUEST_MUTE_ON_ERROR, 
        REQUEST_MUTE_ON_SUCCESS, REQUEST_IGNORE_401_ERROR, REQUEST_MUTED, REQUEST_IGNORE_TOKEN_INVALID, REQUEST_IGNORE_TOKEN_MISSING, REQUEST_IGNORE_UNKNOWN_VALIDATING} = error.config
      const data = response.data
      const status = response.status
      if (!REQUEST_IGNORE_401_ERROR && status === 401) {
        if (data?.message == 'TOKEN_INVALID' && !REQUEST_IGNORE_TOKEN_INVALID)
          dispatch(onLogout())
        if (data?.message == 'UNKNOWN_VALIDATING_EXCEPTION' && !REQUEST_IGNORE_UNKNOWN_VALIDATING)
          dispatch(onLogout())
        if (data?.message == 'TOKEN_MISSING' && !REQUEST_IGNORE_TOKEN_MISSING)
          dispatch(onLogout())
      }
      let message = ''
      if (data)
        message = data.error || data.message
      else if (error.message == 'Network Error')
        message = messages['error.networkError'].toString()
      else if (error.message)
        message = error.message
      else
        message = messages['error.message.somethingWentWrong'].toString()

      if (!REQUEST_MUTE_ON_ERROR && !REQUEST_MUTED)
        dispatch({type: FETCH_ERROR, payload: message})
      else if (!REQUEST_MUTE_ON_SUCCESS && !REQUEST_MUTED)
        dispatch({type: FETCH_SUCCESS})
          
      return Promise.reject({...error, message})
    }

    const reqInterceptor = axiosInstance.interceptors.request.use(apiRequestInterceptor);
    const resInterceptor = axiosInstance.interceptors.response.use(apiSuccessResponseInterceptor, apiFailureResponseInterceptor);
    setReady(true)
    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, []);
  
  return ready
};

const RequestInterceptor = ({ children }: React.PropsWithChildren<any>) => {
  const initialized = useRequestInterceptor()
  if (initialized)
    return children
  else return null
}

export {useRequestInterceptor, RequestInterceptor}