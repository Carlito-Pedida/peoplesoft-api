import { RequestHandler } from "express";
import { Employee, IEmployee } from "../models/employee";
import { IUser } from "../models/user";
import { verifyUser } from "../services/auth";

export const getAllEmployee: RequestHandler = async (req, res, next) => {
  let employeeList = await Employee.find();
  res.status(200).json(employeeList);
};

export const getOneEmployee: RequestHandler = async (req, res, next) => {
  let employeeId = req.params.id;
  let employee = await Employee.findById(employeeId);
  res.status(200).json(employee);
};

export const addEmployee: RequestHandler = async (req, res, next) => {
  let user: IUser | null = await verifyUser(req);

  if (!user) {
    return res.status(403).send();
  }

  const newEmployee: IEmployee = new Employee({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    imageUrl: req.body.imageUrl,
    email: req.body.email,
    phone: req.body.phone,
    position: req.body.position,
    hire_date: req.body.hire_date,
    type: req.body.type,
    benefits: req.body.benefits,
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
  } catch (err) {
    res.status(500).send(err);
  }
};

export const editEmployee: RequestHandler = async (req, res, next) => {
  let user: IUser | null = await verifyUser(req);

  if (!user) {
    return res.status(403).send();
  }

  let employeeId = req.params.id;
  const updatedEmployee: IEmployee = new Employee({
    _id: employeeId,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    imageUrl: req.body.imageUrl,
    email: req.body.email,
    phone: req.body.phone,
    position: req.body.position,
    hire_date: req.body.hire_date,
    type: req.body.type,
    benefits: req.body.benefits,
    length_of_service: req.body.length_of_service,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    author: req.body._id
  });

  await Employee.findByIdAndUpdate(employeeId, { $set: updatedEmployee });

  res.status(200).json(updatedEmployee);
};

export const deleteEmployee: RequestHandler = async (req, res, next) => {
  let user: IUser | null = await verifyUser(req);

  if (!user) {
    return res.status(403).send();
  }

  let employeeId = req.params.id;
  let result = await Employee.findByIdAndDelete(employeeId);
  res.status(200).json(result);
};
