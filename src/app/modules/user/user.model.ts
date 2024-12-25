import { model, Schema } from "mongoose";
import { UserRoles } from "./user.constant";

const userSchema = new Schema(
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
    },
    {
        timestamps: true,
    },
);

const User = model("User", userSchema);
export default User;
