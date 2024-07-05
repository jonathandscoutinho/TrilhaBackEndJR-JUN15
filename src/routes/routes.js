import { Router } from "express"
import { createTableUser, selectUsers, selectUser , insertUser, updateUser, deleteUser} from "../controllers/user.js"
import { createTableTask, deleteTask, insertTask, selectTask, selectTasks, updateTask } from "../controllers/task.js"

const router = Router()

router.get('/', (req, res)=> res.status(200).json({
    "statusCode":200,
    "msg":"Ok, router funcionando!"
}))

createTableUser()
createTableTask()

router.get('/users', selectUsers)
router.get('/user', selectUser)
router.post('/user', insertUser)
router.put('/user', updateUser)
router.delete('/user', deleteUser)
router.get('/tasks', selectTasks)
router.get('/task', selectTask)
router.post('/task', insertTask)
router.put('/task', updateTask)
router.delete('/task', deleteTask)


export default router

