"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.editEmployee = exports.addEmployee = exports.getOneEmployee = exports.getAllEmployee = void 0;
const employee_1 = require("../models/employee");
const auth_1 = require("../services/auth");
const getAllEmployee = async (req, res, next) => {
    let employeeList = await employee_1.Employee.find();
    res.status(200).json(employeeList);
};
exports.getAllEmployee = getAllEmployee;
const getOneEmployee = async (req, res, next) => {
    let employeeId = req.params.id;
    let employee = await employee_1.Employee.findById(employeeId);
    res.status(200).json(employee);
};
exports.getOneEmployee = getOneEmployee;
const addEmployee = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    const newEmployee = new employee_1.Employee({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        imageUrl: req.body.imageUrl,
        email: req.body.email,
        phone: req.body.phone,
        badge_number: req.body.badge_number,
        position: req.body.position,
        hire_date: req.body.hire_date,
        type: req.body.type,
        benefits: req.body.benefits,
        salary: req.body.salary,
        length_of_service: req.body.length_of_service,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        user: req.body._id
    });
    try {
        await newEmployee.save();
        res.status(201).json(newEmployee);
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.addEmployee = addEmployee;
const editEmployee = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let employeeId = req.params.id;
    const updatedEmployee = new employee_1.Employee({
        _id: employeeId,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        imageUrl: req.body.imageUrl,
        email: req.body.email,
        phone: req.body.phone,
        badge_number: req.body.badge_number,
        position: req.body.position,
        hire_date: req.body.hire_date,
        type: req.body.type,
        benefits: req.body.benefits,
        salary: req.body.salary,
        length_of_service: req.body.length_of_service,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        author: req.body._id
    });
    await employee_1.Employee.findByIdAndUpdate(employeeId, { $set: updatedEmployee });
    res.status(200).json(updatedEmployee);
};
exports.editEmployee = editEmployee;
const deleteEmployee = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let employeeId = req.params.id;
    let result = await employee_1.Employee.findByIdAndDelete(employeeId);
    res.status(200).json(result);
};
exports.deleteEmployee = deleteEmployee;
//# sourceMappingURL=employeeController.js.map