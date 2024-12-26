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

// Pre hook to filter out deleted users before any find query
userSchema.pre("find", function (next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});

// Pre hook to filter out deleted users before any findOne query
userSchema.pre("findOne", function (next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});

// Pre hook to filter out deleted users before any findOneAndUpdate query
userSchema.pre("findOneAndUpdate", function (next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});

// Pre hook to filter out deleted users before any findOneAndDelete query
userSchema.pre("findOneAndDelete", function (next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});

const User = model<IUser>("User", userSchema);
export default User;
