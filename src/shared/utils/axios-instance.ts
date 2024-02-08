import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: '/'
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    try {
      if (error.response.status === 401) {
        await axios.post('/api/login/refresh-token')
        return axios(originalRequest)
      }
    } catch (error) {
      return Promise.reject(errorHandler(error))
    }

    return Promise.reject(errorHandler(error))
  }
)

function errorHandler(error: any) {
  if (!error) {
    return undefined
  }
  if (typeof error === 'string') {
    return error
  }
  let message = '請重新登入再試'
  if (error.response) {
    const { status, data } = error.response

    if (typeof data === 'object' && data.message) {
      return data.message
    }
    if (status >= 500) {
      message = '服務器錯誤，請稍後重試'
    } else if (status >= 400) {
      if (typeof data === 'string') {
        message = data
      } else {
        message = '請求錯誤，請檢查參數和請求方法'
      }
    }
  } else if (error.request) {
    message = '請求超時，請檢查網路連線'
  } else {
    message = error.message || '請重新登入再試'
  }
  return message
}
