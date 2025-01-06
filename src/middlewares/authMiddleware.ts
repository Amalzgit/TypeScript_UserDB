import { Request,Response,NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtil";
import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
      interface Request {
        user?: JwtPayload;
      }
    }
  }

export function authMiddleware(req:Request,res:Response,next:NextFunction):void {
    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        res.status(401).json({message:'Access deenied, No token provided'});
        return
    }
    const payload = verifyToken(token);
    if(!payload){
        res.status(401).json({message:"invalid token"});
        return
    }
    req.user =payload
    next()
} 