import express from 'express'
import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById } from '../controllers/users.controller.js'
const router = express.Router() 


router.get('/', getAllUsers)

router.get('/:id', getUserById)

router.post('/', createUser)

router.put('/:id', updateUserById)

router.delete('/:id', deleteUserById)

export default router