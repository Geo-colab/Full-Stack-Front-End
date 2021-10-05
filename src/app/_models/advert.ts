import { AdvertState } from "./advert-state.enum";

export class Advert {
    id: string;
    advertHead: string;
    advertDetails: string;
    price: number;
    advertState: AdvertState;
    provinceId: string;
    cityId: string;
    userId: string;
}