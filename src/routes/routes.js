import { json, Router } from "express"
import { createTableUser, selectUsers, selectUser , insertUser, updateUser, deleteUser, authUser, verifyJWT} from "../controllers/user.js"
import { createTableTask, deleteTask, insertTask, selectTask, selectTasks, updateTask } from "../controllers/task.js"

const router = Router()

router.get('/', (req, res)=> res.status(200).json({
    "statusCode":200,
    "msg":"Ok, router funcionando!"
}))

createTableUser()
createTableTask()

router.get('/listarUsuarios', selectUsers)
router.get('/listarUsuario', selectUser)
router.post('/registrarUsuario', insertUser)    
router.put('/editarUsuario', verifyJWT, updateUser)
router.delete('/deletarUsuario', verifyJWT, deleteUser)

router.get('/listarTarefas', verifyJWT, selectTasks)
router.get('/listarTarefa', verifyJWT, selectTask)
router.post('/registrarTarefa', verifyJWT, insertTask)
router.put('/editarTarefa', verifyJWT, updateTask)
router.delete('/deletarTarefa', verifyJWT, deleteTask)

router.post('/autenticarUsuario', authUser)

export default router