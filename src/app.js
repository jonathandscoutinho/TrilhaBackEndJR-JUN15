import express from 'express'
import fs from 'fs'
import https from 'https'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())


import router from './routes/routes.js'
app.use(router)

//app.listen(3000, ()=> console.log('API Rodando.'))

https.createServer({
    cert: fs.readFileSync('SSL/code.crt'),
    key: fs.readFileSync('SSL/code.key')
}, app).listen(3000, ()=> console.log('server run :3000'))