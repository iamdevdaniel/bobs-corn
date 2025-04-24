import { create } from "zustand"
import { type CornData, type RequestStatus, API_STATUS } from "./types"
import { getClientInfo } from "./api"

type StoreProps = {
  cornQty: CornData
  apiGetUserInfoStatus: RequestStatus
}

type StoreActions = {
  apiGetUserInfo: (userId: string) => void
}

const defaultState: StoreProps = {
  cornQty: {
    availableCorn: 0,
    userTotalCorn: 0,
  },
  apiGetUserInfoStatus: API_STATUS.SUCCESS,
}

export const useCornStore = create<StoreProps & StoreActions>((set) => ({
  ...defaultState,
  apiGetUserInfo: async (userId: string) => {
    try {
      set({ apiGetUserInfoStatus: API_STATUS.LOADING })
      const data = await getClientInfo(userId)
      set({
        cornQty: data,
        apiGetUserInfoStatus: API_STATUS.SUCCESS,
      })
    } catch {
      set({ apiGetUserInfoStatus: API_STATUS.ERROR })
    }
  },
}))
