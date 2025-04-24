import express from 'express'
import { AppError } from './2_services'

const app = express()
const PORT = 3013

app.use(express.json())

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
