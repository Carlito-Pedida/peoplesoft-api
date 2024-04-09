import mongoose from "mongoose";
import { Document, Schema, Model, model } from "mongoose";

interface IUser extends Document {
  first_name: string;
  last_name: string;
  position: string;
  imageUrl: string;
  username: string;
  password: string;
  employee: { type: mongoose.Types.ObjectId; ref: "employee" };
}

const userSchema: Schema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  position: {
    type: String
  },
  imageUrl: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  employee: { type: mongoose.Types.ObjectId, ref: "employee" }
});

const User = model<IUser>("User", userSchema);

export { IUser, User };
