import { AdvertState } from "./advert-state.enum";
import { City } from "./city";
import { Province } from "./province";

export class Advert {
    id: string;
    advertHead: string;
    advertDetails: string;
    price: number;
    advertState: AdvertState;
    provinceId: string;
    cityId: string;
    userId: string;
    province: Province;
    city: City;
}