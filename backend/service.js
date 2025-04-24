import express from 'express'
import { decrementCorn, initDb } from './db.js'

const app = express()
const PORT = 3013

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
