import { Advert } from "./advert";

export class AdvertSearch {
    provinceId: string;
    cityId?: string;
    minPrice?: number;
    maxPrice?: number;
    keyword?: string;
}