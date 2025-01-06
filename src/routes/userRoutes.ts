import express from 'express' ;

import { UserController } from '../controller/userController';
import { UserServices } from '../services/userServices';
import { UserRepository } from '../repositories/userRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router()
const userController = new UserController(new UserServices(new UserRepository()));


router.post('/',(req,res) => userController.createUser(req,res));
router.get('/',authMiddleware,(req,res) =>userController.getAllUsers(req,res));
router.get('/:id',authMiddleware,(req,res) =>userController.getUserById(req,res));
router.put('/:id',authMiddleware,(req,res)=>userController.updateUser(req,res));
router.delete('/:id',authMiddleware,(req,res)=>userController.deleteUser(req,res));

export default router