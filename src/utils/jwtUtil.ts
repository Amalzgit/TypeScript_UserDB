import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()
const secretKey = process.env.SECRET_KEY || ""; 

if (!secretKey) {
    throw new Error("SECRET_KEY environment variable is not set");
}

interface JwtPayload {
    id: string;
    role: string;
    [key: string]: any;
}
export function generateToken(payload:JwtPayload):string {
    return jwt.sign(payload,secretKey,{expiresIn:"1h"})
}

export function verifyToken(token:string):JwtPayload | null {
    try{
        return jwt.verify(token,secretKey) as JwtPayload;
    }catch {
        console.error("Token verification failed:");
        return null;
    }
}