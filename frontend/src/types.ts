export type CornData = {
  availableCorn: number
  userTotalCorn: number
}

export type RequestStatus = {
  LOADING: boolean
  SUCCESS: boolean
  ERROR: boolean
}

export const API_STATUS: Record<'SUCCESS' | 'LOADING' | 'ERROR' | 'IDLE', RequestStatus> = {
  IDLE: { LOADING: false, SUCCESS: false, ERROR: false },
  SUCCESS: { LOADING: false, SUCCESS: true, ERROR: false },
  LOADING: { LOADING: true, SUCCESS: false, ERROR: false },
  ERROR: { LOADING: false, SUCCESS: false, ERROR: true },
}