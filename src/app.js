import express from 'express'
import fs from 'fs'
import https from 'https'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../swagger.json' assert {type: 'json'}
import router from './routes/routes.js'

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use(router)

https.createServer({
    cert: fs.readFileSync('SSL/code.crt'),
    key: fs.readFileSync('SSL/code.key')
}, app).listen(3000, ()=> console.log('server run :3000'))