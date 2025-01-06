"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jwtUtil_1 = require("../utils/jwtUtil");
function authMiddleware(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: 'Access deenied, No token provided' });
        return;
    }
    const payload = (0, jwtUtil_1.verifyToken)(token);
    if (!payload) {
        res.status(401).json({ message: "invalid token" });
        return;
    }
    req.user = payload;
    next();
}
