"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY || "";
if (!secretKey) {
    throw new Error("SECRET_KEY environment variable is not set");
}
function generateToken(payload) {
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: "1h" });
}
function verifyToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, secretKey);
    }
    catch (_a) {
        console.error("Token verification failed:");
        return null;
    }
}
