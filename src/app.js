import express from 'express' //importação express
const app = express() //herda os metodos do express

app.use(express.json()) //define que o express irá receber dados json.

//metodo GET, passando como parâmetro "(req,res) =>" que significa requisição e resposta.
//res.send é o retorno da function.

const users = []

app.post('/usuarios', (req, res) =>{
    
    users.push(req.body)

    res.send('Ok, aqui deu certo!')
})

app.get('/usuarios', (req, res) => {
    
    res.json(users)
})

//cria uma porta 3000 para acessar os endpoints da API.
app.listen(3000)
