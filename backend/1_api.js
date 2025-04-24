import express from 'express'
import {
  AppError,
  makePurchase,
  initializeApp,
} from './2_services.js'

const app = express()
const PORT = 3013
app.use(express.json())

const startServer = async () => {
  await initializeApp()
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

app.post('/purchase', async (req, res) => {
  const { clientId } = req.body

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

startServer()
