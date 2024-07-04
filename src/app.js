import express from 'express'
const app = express()
app.use(express.json())

import router from './routes/routes.js'
app.use(router)

app.listen(3000, ()=> console.log('API Rodando.'))
