"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    constructor(userServices) {
        this.userServices = userServices;
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newUser = yield this.userServices.createUser({
                    name,
                    email,
                    password: hashedPassword
                });
                res.status(201).json(newUser);
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userServices.getAllUsers();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield this.userServices.getUserById(id);
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedUser = yield this.userServices.updateUser(id, req.body);
                if (!updatedUser) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                res.status(200).json(updatedUser);
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const isDeleted = yield this.userServices.deleteUser(id);
                if (!isDeleted) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
}
exports.UserController = UserController;
