import IPriceMenu from "./IPriceMenu";

interface ILaundryService {
    id: string;
    name: string;
    laundryProcess: number;
    
    priceMenus: IPriceMenu[];

    laundryProcessWash: boolean;
    laundryProcessDry: boolean;
    laundryProcessIron: boolean;
}
export default ILaundryService;