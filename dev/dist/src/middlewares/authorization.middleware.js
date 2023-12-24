"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
const error_1 = require("../lib/error");
const authorizationMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        // Kullanıcının oturum açmış olması kontrol edilir
        if (!req.user)
            throw error_1.UserNotExists;
        const userRoles = req.user.role || [];
        const hasRequiredRoles = requiredRoles.every((role) => userRoles.includes(role));
        if (!hasRequiredRoles) {
            return res.status(403).json({ message: 'Forbidden - Insufficient privileges' });
        }
        next();
    };
};
exports.authorizationMiddleware = authorizationMiddleware;
