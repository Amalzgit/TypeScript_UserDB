import { IUserRepository } from "../repositories/userRepository";
import { User,UserDocument } from "../models/userModel";

 export class UserServices {
    private userRepository :IUserRepository;
    constructor(userRepository:IUserRepository) {
        this.userRepository =userRepository
    }

    async createUser(user:User):Promise<UserDocument>{
        return this.userRepository.create(user)
    }
    async getAllUsers():Promise<UserDocument[]> {
        return this.userRepository.findAll()
    }
    async getUserById(id:string):Promise<UserDocument|null>{
        return this.userRepository.findById(id)
    }
    async updateUser(id:string,updateUser:Partial<User>):Promise<UserDocument | null>{
        return this.userRepository.update(id,updateUser)
    }
    async deleteUser(id:string):Promise<UserDocument | null>{
        return this.userRepository.delete(id)
    }
 }