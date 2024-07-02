import { openDb } from "../database/configdb.js" //importação openDB.

export async function createTable(){ //função assíncrona para executar comandos SQL.
    openDb().then(db=>{ //abre um banco e executa uma query SQL.
        db.exec('CREATE TABLE IF NOT EXISTS user(email TEXT PRIMARY KEY, password TEXT)')
    })
}

export async function insertUser(user){ //função insert que espera receber objeto user
    openDb().then(db=>{ //abre um banco e executa uma query SQL.
        db.run('INSERT INTO user (email, password) VALUES (?,?)', [user.email, user.password])
    })
}

export async function updateUser(user){ //função update que espera receber objeto user
    openDb().then(db=>{
        db.run('UPDATE user SET password=? WHERE email=?', [user.password, user.email])
    })
}

/*export async function listUser(user){ //função select que espera retornar objetos user
    openDb().then(db=>{ 
        db.run('UPDATE user SET password=? WHERE email=?', [user.password, user.email])
    })
}*/