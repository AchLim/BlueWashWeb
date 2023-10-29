import IPriceMenu, { ProcessPriceMenuDisplayName } from "./IPriceMenu";

const WASH_BIT = 0b0001;
const DRY_BIT = 0b0010;
const IRON_BIT = 0b0100;

interface ILaundryService {
    id: string;
    name: string;
    laundryProcess: number;
    wash: boolean;
    dry: boolean;
    iron: boolean;
    
    priceMenus: IPriceMenu[];
}

const ProcessLaundryServiceDisplayName = (laundryService : ILaundryService) => {
    let laundryProcess = laundryService.laundryProcess;
    laundryService.wash = (laundryProcess & WASH_BIT) == WASH_BIT;
    laundryService.dry = (laundryProcess & DRY_BIT) == DRY_BIT;
    laundryService.iron = (laundryProcess & IRON_BIT) == IRON_BIT;

    if (laundryService.priceMenus)
        laundryService.priceMenus.map((pm) => {
            ProcessPriceMenuDisplayName(pm);
        })
}

const SetLaundryServiceBits = (laundryService : ILaundryService) => {
    let result = 0;

    if (laundryService.wash)
        result |= WASH_BIT;

    if (laundryService.dry)
        result |= DRY_BIT;

    if (laundryService.iron)
        result |= IRON_BIT;
    
    laundryService.laundryProcess = result;
}

export default ILaundryService;

export {
    ProcessLaundryServiceDisplayName,
    SetLaundryServiceBits,

    WASH_BIT,
    DRY_BIT,
    IRON_BIT
}