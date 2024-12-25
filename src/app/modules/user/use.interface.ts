export type TUserRole = "Buyer" | "Seller" | "Admin";

export interface IUser {
    email: string;
    role: TUserRole;
    firebaseUID: string;
    name: string;
    phone?: string;
}
