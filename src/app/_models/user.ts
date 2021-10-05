﻿import { Advert } from "./advert";
import { Role } from "./role.enum";

export class User {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
    token: string;
    adverts: Advert[];
}