import { model, Schema } from "mongoose";
import { UserRoles } from "./user.constant";
import { IUser } from "./use.interface";

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: UserRoles,
            default: UserRoles[0],
        },
        firebaseUID: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        phone: String,
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

const User = model<IUser>("User", userSchema);
export default User;
