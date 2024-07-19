"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const employeeSchema = new mongoose_2.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    badge_number: {
        type: String,
        required: true,
        unique: true
    },
    position: {
        type: String,
        required: true
    },
    hire_date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    benefits: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    length_of_service: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    user: { type: mongoose_1.default.Types.ObjectId, ref: "user" }
});
const Employee = (0, mongoose_2.model)("Employee", employeeSchema);
exports.Employee = Employee;
//# sourceMappingURL=employee.js.map