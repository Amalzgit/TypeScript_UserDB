import mongoose, {Document} from "mongoose" ;


export interface User {
    name:string;
    email:string;
    password:string;
}

export interface UserDocument extends User,Document {}
const userSchema = new mongoose.Schema<UserDocument>({
    
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;