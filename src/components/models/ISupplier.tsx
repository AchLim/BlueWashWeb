import ICurrency from "./ICurrency";

interface ISupplier {
    id: string;
    supplierCode: string;
    supplierName: string;
    supplierAddress: string | null;
    currency: ICurrency | null;
    currencyId: string | null;

	inputValue?: string;
}

export default ISupplier;

export const EmptySupplier = () : ISupplier => {
	return {
		id: '',
		supplierCode: '',
		supplierName: '',
		supplierAddress: null,
		currency: null,
		currencyId: null,
	}
}