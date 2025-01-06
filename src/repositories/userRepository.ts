import UserModel, { User, UserDocument } from "../models/userModel";

export interface IUserRepository {
    create(user: User): Promise<UserDocument>;
    findById(id: string): Promise<UserDocument | null>;
    findAll(): Promise<UserDocument[]>;
    update(id: string, user: Partial<User>): Promise<UserDocument | null>;
    delete(id: string): Promise<UserDocument | null>;
}

export class UserRepository implements IUserRepository {
    async create(user: User): Promise<UserDocument> {
        const newUSer = new UserModel(user);
        return await newUSer.save();
    }
    async findById(id: string): Promise<UserDocument | null> {
        return await UserModel.findById(id);
    }
    async findAll(): Promise<UserDocument[]> {
        return await UserModel.find();
    }

    async update(
        id: string,
        user: Partial<User>
    ): Promise<UserDocument | null> {
        return await UserModel.findByIdAndUpdate(id, user, { new: true });
    }

    async delete(id: string): Promise<UserDocument | null> {
        return await UserModel.findByIdAndDelete(id);
    }
}
