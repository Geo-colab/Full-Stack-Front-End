import { Advert } from "./advert";
import { Role } from "./role.enum";
import { Seller } from "./seller";

export class User {
    id: string;
    username: string;
    password: string;
    newPassword: string
    firstName: string;
    lastName: string;
    role: Role;
    token: string;
    adverts: Advert[];
    sellerId: string;
    seller: Seller;
}