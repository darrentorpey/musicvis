const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send('Bring yourself back online!')
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})

app.use(express.static('public'))
