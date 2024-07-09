import { openDb } from "../database/configdb.js"
import jwt from 'jsonwebtoken'

const SECRET = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'

export async function createTableTask() {
    await openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS task (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT NOT NULL, email_id INTEGER NOT NULL, FOREIGN KEY (email_id) REFERENCES user (email))')
    })
}

export async function selectTasks(req, res) { //documentado
    const token = req.headers['x-acess-token']
    const decoded = jwt.decode(token, SECRET);
    const userId = decoded.userId;
    const db = await openDb()

    db.all('SELECT * FROM task WHERE email_id=?', [userId])
        .then(tasks => res.json(tasks))
}

export async function selectTask(req, res) {
    let id = req.body.id
    await openDb().then(db => {
        db.get('SELECT * FROM task WHERE id=?', [id])
            .then(task => res.json(task))
    })
}

export async function insertTask(req, res) { //documentado
    let task = req.body
    try {
        const token = req.headers['x-acess-token']
        const decoded = jwt.decode(token, SECRET)
        const userId = decoded.userId
        const db = await openDb()
        try {
            await db.run('INSERT INTO task (description, email_id) VALUES (?,?)', [task.description, userId])

            res.status(200).json({
                message: "Tarefa registrada com sucesso."
            })
        } catch (error) {
            res.status(500).json({
                message: "Erro interno do servidor.",
                error: error.message
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Erro interno do servidor.",
            error: error.message
        })
    }
}

export async function updateTask(req, res) {
    let task = req.body
    try {
        const token = req.headers['x-acess-token']
        const decoded = jwt.decode(token, SECRET)
        const userId = decoded.userId
        const db = await openDb()
        try {
            await db.get('SELECT * FROM task WHERE id=? AND email_id=?', [task.id, userId])
                .then(selectReturn => {
                    if (selectReturn.id === task.id) {
                        db.run('UPDATE task SET description=? WHERE id=?', task.description, task.id)
                        res.status(200).json({
                            message: "Tarefa editada com sucesso."
                        })
                    } else {
                        res.status(500).json({
                            message: "Erro interno do servidor.",
                            error: error.message
                        })
                    }
                })
        } catch (error) {
            res.status(500).json({
                message: "Erro interno do servidor.",
                error: error.message
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Erro interno do servidor.",
            error: error.message
        })
    }
}

export async function deleteTask(req, res) {
    let task = req.body
    try {
        const token = req.headers['x-acess-token']
        const decoded = jwt.decode(token, SECRET)
        const userId = decoded.userId
        const db = await openDb()
        try {
            await db.get('SELECT * FROM task WHERE id=? AND email_id=?', [task.id, userId])
                .then(selectReturn => {
                    if (selectReturn.id === task.id) {
                        db.get('DELETE FROM task WHERE id=?', [task.id])
                        res.status(200).json({
                            message: "Tarefa deletada com sucesso."
                        })
                    } else {
                        res.status(500).json({
                            message: "Erro interno do servidor.",
                            error: error.message
                        })
                    }
                })
        } catch (error) {
            res.status(500).json({
                message: "Erro interno do servidor.",
                error: error.message
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Erro interno do servidor.",
            error: error.message
        })
    }
}
