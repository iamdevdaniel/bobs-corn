import {
  initDb,
  getAvailableCorn,
  getLastPurchase,
  insertPurchase,
  decrementCorn,
} from './3_db.js'

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

const PURCHASE_COOLDOWN_MS = 10000

export const initializeApp = async () => {
  await initDb()
}

export const makePurchase = async (clientId) => {
  const lastPurchase = await getLastPurchase(clientId)
  const lastPurchaseTime = lastPurchase ? new Date(lastPurchase.timestamp).getTime() : 0
  const timeSinceLastPurchase = Date.now() - lastPurchaseTime

  if (lastPurchase && timeSinceLastPurchase < PURCHASE_COOLDOWN_MS) {
    throw new AppError('RATE_LIMIT', 429)
  }

  const availableCorn = await getAvailableCorn()
  if (availableCorn <= 0) {
    throw new AppError('OUT_OF_STOCK', 400)
  }

  const purchaseTimestamp = new Date().toISOString()
  const userTotalCorn = lastPurchase ? lastPurchase.quantity + 1 : 1

  await insertPurchase(clientId, purchaseTimestamp, userTotalCorn)
  await decrementCorn()

  return {
    availableCorn: availableCorn - 1,
    userTotalCorn,
  }
}
