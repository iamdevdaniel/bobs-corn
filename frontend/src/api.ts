import axios from 'axios'
import { CornData } from './types'

const API_BASE_URL = 'http://localhost:3013'

export const getClientInfo = async (clientId: string): Promise<CornData> => {
  const response = await axios.get(`${API_BASE_URL}/clients/${clientId}`)
  return response.data
}

export const makePurchase = async (clientId: string): Promise<CornData> => {
  const response = await axios.patch(`${API_BASE_URL}/clients/${clientId}/purchases`)
  return response.data
}