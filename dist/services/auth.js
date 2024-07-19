"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.signUserToken = exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const secret = "The best things in life are priceless!";
const hashPassword = async (plainTextPassword) => {
    const saltRound = 12;
    const hash = await bcrypt_1.default.hash(plainTextPassword, saltRound);
    return hash;
};
exports.hashPassword = hashPassword;
const comparePasswords = async (plainTextPassword, hashPassword) => {
    return await bcrypt_1.default.compare(plainTextPassword, hashPassword);
};
exports.comparePasswords = comparePasswords;
const signUserToken = async (user) => {
    let token = jsonwebtoken_1.default.sign({
        userId: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        imageUrl: user.imageUrl
    }, secret, { expiresIn: "1hr" });
    return token;
};
exports.signUserToken = signUserToken;
const verifyUser = async (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        try {
            let decoded = await jsonwebtoken_1.default.verify(token, secret);
            return await user_1.User.findById(decoded.userId);
        }
        catch (err) {
            return null;
        }
    }
    else {
        return null;
    }
};
exports.verifyUser = verifyUser;
//# sourceMappingURL=auth.js.map