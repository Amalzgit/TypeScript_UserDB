"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const userServices_1 = require("../services/userServices");
const userRepository_1 = require("../repositories/userRepository");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
const userController = new userController_1.UserController(new userServices_1.UserServices(new userRepository_1.UserRepository()));
router.post('/', (req, res) => userController.createUser(req, res));
router.get('/', authMiddleware_1.authMiddleware, (req, res) => userController.getAllUsers(req, res));
router.get('/:id', authMiddleware_1.authMiddleware, (req, res) => userController.getUserById(req, res));
router.put('/:id', authMiddleware_1.authMiddleware, (req, res) => userController.updateUser(req, res));
router.delete('/:id', authMiddleware_1.authMiddleware, (req, res) => userController.deleteUser(req, res));
exports.default = router;
