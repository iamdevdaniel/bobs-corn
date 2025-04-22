import express from 'express'
const app = express()
const PORT = 3013

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})