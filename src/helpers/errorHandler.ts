import axios, { AxiosError } from 'axios'

import { ToastMessageType } from '../types/toast'

const errorHandler = (error: any | AxiosError): ToastMessageType => {
  /** Handle normal errors */
  if (!axios.isAxiosError(error)) {
    return {
      severity: 'error',
      summary: 'System error',
      detail: error.message,
    }
  }

  if (!error.response) {
    return {
      severity: 'error',
      summary: 'Network error',
      detail: error.message,
    }
  }
  /** Handle axios errors */
  const { data } = error.response

  switch (error.response?.status) {
    case 404:
      return {
        severity: 'error',
        summary: 'Character not found',
        detail: 'No character found matching that name`',
      }

    default:
      return {
        severity: 'error',
        summary: 'System error',
        detail: data.error || 'Something went wrong',
      }
  }
}
export default errorHandler
