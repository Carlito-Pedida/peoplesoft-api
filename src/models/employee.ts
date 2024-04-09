import mongoose from "mongoose";
import { Document, Schema, Model, model } from "mongoose";

interface IEmployee extends Document {
  first_name: string;
  last_name: string;
  imageUrl: string;
  email: string;
  phone: string;
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
    type: Number,
    required: true
  },
  state: {
    type: Number,
    required: true
  },
  zip: {
    type: Number,
    required: true
  },

  user: { type: mongoose.Types.ObjectId, ref: "user" }
});

const Employee: Model<IEmployee> = model<IEmployee>("Employee", employeeSchema);

export { IEmployee, Employee };
