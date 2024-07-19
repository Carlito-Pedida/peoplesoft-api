"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOneUser = exports.getOneUser = exports.loginUser = exports.createUser = exports.getAllUsers = void 0;
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
const getAllUsers = async (req, res, next) => {
    let userList = await user_1.User.find();
    res.status(200).json(userList);
};
exports.getAllUsers = getAllUsers;
const createUser = async (req, res, next) => {
    const newUser = new user_1.User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        imageUrl: req.body.imageUrl,
        position: req.body.position,
        username: req.body.username,
        password: req.body.password
    });
    try {
        if (newUser.username && newUser.password) {
            let hashedPassword = await (0, auth_1.hashPassword)(newUser.password);
            newUser.password = hashedPassword;
            let created = await newUser.save();
            res.status(201).json({
                username: created.username,
                userId: created._id
            });
        }
        else {
            res.status(400).send("Username and password required");
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.createUser = createUser;
const loginUser = async (req, res, next) => {
    let existingUser = await user_1.User.findOne({
        username: req.body.username
    });
    if (existingUser) {
        let passwordsMatch = await (0, auth_1.comparePasswords)(req.body.password, existingUser.password);
        if (passwordsMatch) {
            let token = await (0, auth_1.signUserToken)(existingUser);
            res.status(200).json({ token });
        }
        else {
            res.status(401).json("Invalid password");
        }
    }
    else {
        res.status(401).json("Invalid username");
    }
};
exports.loginUser = loginUser;
const getOneUser = async (req, res, next) => {
    try {
        const id = req.params.userId; // Changed from "id" to "userId"
        const oneUser = await user_1.User.findById(id);
        if (oneUser) {
            res.status(200).json(oneUser);
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getOneUser = getOneUser;
const updateOneUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await user_1.User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        // Update user fields if they are present in the request body
        if (req.body.first_name)
            user.first_name = req.body.first_name;
        if (req.body.last_name)
            user.last_name = req.body.last_name;
        if (req.body.imageUrl)
            user.imageUrl = req.body.imageUrl;
        if (req.body.position)
            user.position = req.body.position;
        if (req.body.username)
            user.username = req.body.username;
        if (req.body.password) {
            // Check if the password has changed
            if (req.body.password !== user.password) {
                // If password is being updated, hash it
                user.password = await (0, auth_1.hashPassword)(req.body.password);
            }
        }
        const updatedUser = await user.save();
        res.status(200).json({
            username: updatedUser.username,
            userId: updatedUser._id
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.updateOneUser = updateOneUser;
// export const updateOneUser: RequestHandler = async (req, res, next) => {
//   const userId = req.params.userId; // Assuming userId is passed in the request params
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).send("User not found");
//     }
//     // Update user fields if they are present in the request body
//     if (req.body.first_name) user.first_name = req.body.first_name;
//     if (req.body.last_name) user.last_name = req.body.last_name;
//     if (req.body.imageUrl) user.imageUrl = req.body.imageUrl;
//     if (req.body.position) user.position = req.body.position;
//     if (req.body.username) user.username = req.body.username;
//     if (req.body.password) {
//       // If password is being updated, hash it
//       user.password = await hashPassword(req.body.password);
//     }
//     const updatedUser = await user.save();
//     res.status(200).json({
//       username: updatedUser.username,
//       userId: updatedUser._id
//     });
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };
// export const updateOneUser: RequestHandler = async (req, res, next) => {
//   let user: IUser | null = await verifyUser(req);
//   if (!user) {
//     return res.status(403).send();
//   }
//   let userId = req.params.id;
//   const updatedUser: IUser = new User({
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     imageUrl: req.body.imageUrl,
//     position: req.body.position,
//     username: req.body.username,
//     password: req.body.password
//   });
//   await User.findByIdAndUpdate(userId, { $set: updatedUser });
//   res.status(200).json(updatedUser);
// };
// export const updateOneUser: RequestHandler = async (req, res, next) => {
//   let user: IUser | null = await verifyUser(req);
//   if (!user) {
//     return res.status(403).send();
//   }
//   let userId = req.params.id;
//   const updatedUserFields: any = {
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     imageUrl: req.body.imageUrl,
//     position: req.body.position,
//     username: req.body.username
//   };
//   if (req.body.password) {
//     const hashedPassword = await hashPassword(req.body.password);
//     updatedUserFields.password = hashedPassword;
//   }
//   const updatedUser = await User.findByIdAndUpdate(
//     userId,
//     { $set: updatedUserFields },
//     { new: true }
//   );
//   res.status(200).json(updatedUser);
// };
//# sourceMappingURL=userController.js.map