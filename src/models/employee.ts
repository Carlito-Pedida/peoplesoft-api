import mongoose from "mongoose";
import { Document, Schema, Model, model } from "mongoose";

interface IEmployee extends Document {
  first_name: string;
  last_name: string;
  gender: string;
  imageUrl: string;
  email: string;
  phone: string;
  badge_number: number;
  position: string;
  hire_date: Date;
  type: string;
  benefits: string;
  salary: number;
  length_of_service: number;
  address: string;
  city: string;
  state: string;
  zip: string;

  user: { type: mongoose.Types.ObjectId; ref: "user" };
}

const employeeSchema: Schema = new Schema({
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

  user: { type: mongoose.Types.ObjectId, ref: "user" }
});

const Employee: Model<IEmployee> = model<IEmployee>("Employee", employeeSchema);

export { IEmployee, Employee };
