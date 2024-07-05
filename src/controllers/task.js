import { openDb } from "../database/configdb.js";

export async function createTableTask() {
    await openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS task (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT NOT NULL, email_id INTEGER NOT NULL, FOREIGN KEY (email_id) REFERENCES user (email))')
    })
}

export async function selectTasks(req, res) {
    await openDb().then(db => {
        db.all('SELECT * FROM task')
            .then(tasks => res.json(tasks))
    })
}

export async function selectTask(req, res) {
    let id = req.body.id
    await openDb().then(db => {
        db.get('SELECT * FROM task WHERE id=?', [id])
            .then(task => res.json(task))
    })
}

export async function insertTask(req, res) {
    let task = req.body
    await openDb().then(db => {
        db.run('INSERT INTO task (description, email_id) VALUES (?,?)', [task.description, task.email_id])
    })
    res.status(200).json({
        "msg":"Tarefa criado com sucesso!"
    })
}

export async function updateUser(req, res) {
    let user = req.body
    await openDb().then(db => {
        db.run('UPDATE user SET password=? WHERE email=?', [user.password, user.email])
    })
    res.status(200).json({
        "msg": "Senha alterada com sucesso!"
    })
}

export async function updateTask(req, res) {
    let task = req.body
    await openDb().then(db => {
        db.run('UPDATE task SET description=? WHERE id=?', [task.description, task.id])
    })
    res.status(200).json(res.task, {
        "msg": "Tarefa alterada com sucesso!"
    })
}

export async function deleteTask(req, res) {
    let id = req.body.id
    await openDb().then(db => {
        db.get('DELETE FROM task WHERE id=?', [id])
    })
    res.status(200).json({
        "msg": "Tarefa excluída com sucesso!"
    })
}
