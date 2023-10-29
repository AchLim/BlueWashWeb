interface IPriceMenu {
    laundryServiceId: string;
    priceMenuId: string;
    name: string;
    price: number;
    pricingOption: PricingOption;

    processingTime: number;
    timeUnit: TimeUnit;

    deliveryOption: DeliveryOption;

    priceDisplay: string;
    pricingOptionDisplay: string;
    timeUnitDisplay: string;
    deliveryOptionDisplay: string;
    processingTimeDisplay: string;
};

enum PricingOption {
    Unit = 1,
    Kilogram = 2,
    Set = 4,
    Package = 8
}

enum TimeUnit
{
    None = 0,
    Hour = 1,
    Day = 2,
}

enum DeliveryOption
{
    None = 0,
    Reguler = 1,
    OneDay = 2,
    Express = 4,
}

const ProcessPriceMenuDisplayName = (priceMenu: IPriceMenu) => {
    priceMenu.priceDisplay = priceMenu.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
    priceMenu.pricingOptionDisplay = GetPricingOptionName(priceMenu.pricingOption);
    priceMenu.timeUnitDisplay = GetTimeUnitName(priceMenu.timeUnit);
    priceMenu.deliveryOptionDisplay = GetDeliveryOptionName(priceMenu.deliveryOption);
    priceMenu.processingTimeDisplay = GetProcessingTimeName(priceMenu.pricingOption, priceMenu.timeUnit);
}

const GetPricingOptionName = (opt: PricingOption) => {
    switch (opt) {
        case PricingOption.Package:
            return "Paket";
        default:
            return PricingOption[opt];
    }
}

const GetTimeUnitName = (unit: TimeUnit) => {
    switch (unit) {
        case TimeUnit.Hour:
            return "Jam";
        case TimeUnit.Day:
            return "Hari";

        default:
        case TimeUnit.None:
            return "-";
    }
}

const GetDeliveryOptionName = (opt: DeliveryOption) => {
    switch (opt) {
        case DeliveryOption.OneDay:
            return "One Day";
        case DeliveryOption.None:
            return "-";
        default:
            return DeliveryOption[opt];
    }
}

const GetProcessingTimeName = (processingTime: number, timeUnit: TimeUnit) => {
    if (timeUnit == TimeUnit.None)
        return '-';

    let timeUnitName = GetTimeUnitName(timeUnit);
    return `${processingTime} ${timeUnitName}`;
}

export default IPriceMenu;
export {
    ProcessPriceMenuDisplayName
};