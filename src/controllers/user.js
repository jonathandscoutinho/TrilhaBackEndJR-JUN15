import { openDb } from "../database/configdb.js"

export async function createTableUser(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS user(email TEXT NOT NULL PRIMARY KEY, password TEXT NOT NULL)')
    })
}

export async function selectUsers(req, res){
    openDb().then(db=>{ 
       db.all('SELECT * FROM user')
       .then(users => res.json(users))
    })
}

export async function selectUser(req, res){
   let email = req.body.email
   openDb().then(db=>{
       db.get('SELECT * FROM user WHERE email=?', [email])
       .then(user => res.json(user))
   })
}

export async function insertUser(req, res){
    let user = req.body
    openDb().then(db=>{
        db.run('INSERT INTO user (email, password) VALUES (?,?)', [user.email, user.password])
    })
    res.status(200).json(res.user, {
        "msg":"Usuário criado com sucesso!"
    })
}

export async function updateUser(req, res){
    let user = req.body
    openDb().then(db=>{
        db.run('UPDATE user SET password=? WHERE email=?', [user.password, user.email])
    })
    res.status(200).json(res.user, {
        "msg":"Senha alterada com sucesso!"
    })
}

 export async function deleteUser(req, res){
    let email = req.body.email
    openDb().then(db=>{
        db.get('DELETE FROM user WHERE email=?', [email])
    })
    res.status(204).json({
        "msg":"Usuário excluído com sucesso!"
    })
}


