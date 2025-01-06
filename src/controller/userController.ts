import { Request, Response } from "express";
import { UserServices } from "../services/userServices";
import bcrypt from "bcrypt";

export class UserController {
    constructor(private userServices: UserServices) {}

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await this.userServices.createUser({
                name,
                email,
                password: hashedPassword,
            });
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userServices.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const user = await this.userServices.getUserById(id);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedUser = await this.userServices.updateUser(
                id,
                req.body
            );
            if (!updatedUser) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const isDeleted = await this.userServices.deleteUser(id);
            if (!isDeleted) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}
