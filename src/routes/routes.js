import { Router } from "express"
import { createTableUser, selectUsers, selectUser , insertUser, updateUser, deleteUser} from "../controllers/user.js"

const router = Router()

router.get('/', (req, res)=> res.status(200).json({
    "statusCode":200,
    "msg":"Ok, router funcionando!"
}))

createTableUser()

router.get('/users', selectUsers)
router.get('/user', selectUser)
router.post('/user', insertUser)
router.put('/user', updateUser)
router.delete('/user', deleteUser)

export default router

