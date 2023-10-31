import ICurrency from "./ICurrency";

interface ICustomer {
    id: string;
    customerCode: string;
    customerName: string;
    customerAddress: string | null;
    currency: ICurrency | null;
    currencyId: string | null;
}

export default ICustomer;