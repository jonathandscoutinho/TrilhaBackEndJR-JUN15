//import { openDb } from './database/configdb.js' //importação de configurações sqlite.
import { createTable, insertUser, updateUser } from './controller/user.js' //importação função createTable() e inserUser.
import express from 'express' //importação express - necessário adicionar "type":"module" em package.json

const app = express() //const app herda os metodos do express
app.use(express.json()) //define que o express irá receber dados no formato json.

createTable(); //função para criar tabela sqlite.


/*******ENDPOINTS USERS ABAIXO*****************************************************/

//metodo POST
app.post('/user', (req, res) =>{ 

    insertUser(req.body) //
    res.json({
        "statusCode":"201",
        "msg":"Usuário cadastrado com sucesso!"
    })
})

//metodo GET
app.get('/user', (req, res) => {})

//metodo PUT
app.put('/user', (req, res) =>{ 
    
    if(req.body && !req.body.email){
        res.json({
            "statusCode":"400",
            "msg":"Você precisa informar um id"
        })
    }else{
        updateUser(req.body)
        res.json({
            "statusCode":"200",
            "msg":"Usuário atualizado com sucesso!"
        })
    }
})


//cria uma porta root 3000 para acessar os endpoints da API.
app.listen(3000)
