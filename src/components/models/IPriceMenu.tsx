interface   IPriceMenu {
    laundryServiceId: string;
    priceMenuId: string;
    name: string;
    price: number;
    pricingOption: PricingOption;

    processingTime: number;
    timeUnit: TimeUnit;

    deliveryOption: DeliveryOption;

    priceDisplay: string;

    // Helper
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

export default IPriceMenu;