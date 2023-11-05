import ICurrency from "./ICurrency";

interface ICustomer {
    id: string;
    customerCode: string;
    customerName: string;
    customerAddress: string | null;
    currency: ICurrency | null;
    currencyId: string | null;

	inputValue?: string;
}

export default ICustomer;

export const EmptyCustomer = () : ICustomer => {
	return {
		id: '',
		customerCode: '',
		customerName: '',
		customerAddress: null,
		currency: null,
		currencyId: null,
	}
}