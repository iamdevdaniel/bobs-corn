import express from 'express'
import {
  AppError,
  makePurchase,
  getClientInfo,
  initializeApp,
} from './2_services.js'

const app = express()
const PORT = 3013
app.use(express.json())

const startServer = async () => {
  await initializeApp()
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

app.patch('/clients/:clientId/purchases', async (req, res) => {
  const { clientId } = req.params

  try {
    const result = await makePurchase(clientId)
    res.status(200).json(result)
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    } 
  }
})

app.get('/clients/:clientId', async (req, res) => {
  const { clientId } = req.params

  try {
    const result = await getClientInfo(clientId)
    res.status(200).json(result)
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
})

startServer()
