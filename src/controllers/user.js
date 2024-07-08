import { openDb } from "../database/configdb.js"
import jwt from 'jsonwebtoken'


const SECRET = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'

export async function createTableUser() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS user(email TEXT NOT NULL PRIMARY KEY, password TEXT NOT NULL)')
    })
}

export function verifyJWT(req, res, next) {
    const token = req.headers['x-acess-token'];
    if (!token) {
        res.status(401).json({ message: "Não autorizado." }).end()
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: "Não autorizado." }).end()
        }

        console.log(`${decoded.userId} fez esta requisição`)
        next()
    })
}

export async function selectUsers(req, res) { //documentado.
    await openDb().then(db => {
        db.all('SELECT * FROM user')
            .then(users => res.json(users))
    })
}

export async function selectUser(req, res) {
    let email = req.body.email
    await openDb().then(db => {
        db.get('SELECT * FROM user WHERE email=?', [email])
            .then(user => res.json(user))
    })
}

export async function insertUser(req, res) { //documentado.
    try {
        let user = req.body;
        let db = await openDb();

        if (!user.email) {
            res.status(440).json({
                message: "Erro: Necessário informar um email."
            });
        } else if (!user.password) {
            res.status(441).json({
                message: "Erro: Necessário informar uma senha."
            });
        } else {
            await db.run('INSERT INTO user (email, password) VALUES (?, ?)', [user.email, user.password]);

            res.status(200).json({
                message: "Usuário registrado com sucesso."
            });
        }
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT' && error.errno === 19) {
            res.status(409).json({
                msg: "Erro: Email já está registrado",
                error: error.message
            });
        } else {
            console.error("Erro: Não foi possível realizar esta ação, tente novamente mais tarde.", error.message);
            res.status(500).json({
                msg: "Erro: Não foi possível realizar esta ação, tente novamente mais tarde.",
                error: error.message
            });
        }
    }
}

export async function updateUser(req, res) { //documentado.
    let user = req.body
    let db = openDb()

    try {

        if (!user.email) {
            res.status(440).json({
                message: "Erro: Necessário informar um email."
            });
        } else if (!user.password) {
            res.status(441).json({
                message: "Erro: Necessário informar um senha."
            });
        } else {
            await db.run('UPDATE user SET password=? WHERE email=?', [user.password, user.email])
            res.status(200).json(res.user, {
                "msg": "Senha alterada com sucesso!"
            })
        }

    } catch (error) {
        console.error("Erro: Não foi possível realizar esta ação, tente novamente mais tarde.", error.message);
        res.status(500).json({
            msg: "Erro: Não foi possível realizar esta ação, tente novamente mais tarde.",
            error: error.message
        });
    }
}

export async function deleteUser(req, res) { //
    let email = req.body.email
    let db = openDb()

    try {
        if (!user.email) {
            res.status(440).json({
                message: "Erro: Necessário informar um email."
            });
        } else {
            await db.get('DELETE FROM user WHERE email=?', [email])
            res.status(200).json({
                "msg": "Usuário deletado com sucesso!"
            })
        }
    } catch (error) {
        console.error("Erro: Não foi possível realizar esta ação, tente novamente mais tarde.", error.message);
        res.status(500).json({
            msg: "Erro: Não foi possível realizar esta ação, tente novamente mais tarde.",
            error: error.message
        });
    }
}

export async function authUser(req, res) {
    let email = req.body.email
    await openDb().then(db => {
        db.get('SELECT * FROM user WHERE email=?', [email])
            .then(user => {
                if (req.body.email === user.email && req.body.password === user.password) {
                    const token = jwt.sign({ userId: req.body.email }, SECRET, { expiresIn: 300 })
                    return res.status(200).json({
                        auth: true, token
                    })
                } else {
                    res.status(401).json({
                        message: "Não autorizado!"
                    }).end()
                }
            })
    })
}

