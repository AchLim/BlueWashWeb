import { ConvertDateTimeToDate } from "../utils/Converter";
import IInventory, { EmptyInventory } from "./IInventory";
import ISupplier, { EmptySupplier } from "./ISupplier";

interface IPurchaseHeader {
    id: string;
	purchaseNo: string;
	purchaseDate: string;
	supplier: ISupplier;
	supplierId: string;
	description: string;
	purchaseDetails: Array<IPurchaseDetail>;
}

export interface IPurchaseDetail {
	purchaseHeaderId: string | null;
	purchaseDetailId: string;

	inventory: IInventory;
	inventoryId: string;

	quantity: number;
	price: number;
}

export default IPurchaseHeader;

export const EmptyPurchaseHeader = () : IPurchaseHeader => {
	return {
		'id': '',
		'purchaseNo': '',
		'purchaseDate': ConvertDateTimeToDate(new Date()),
		'supplier': EmptySupplier(),
		'supplierId': '',
		'description': '',
		'purchaseDetails': []
	}
}

export const EmptyPurchaseDetail = (): IPurchaseDetail => {
	return {
		'purchaseHeaderId': null,
		'purchaseDetailId': '',
		'inventory': EmptyInventory(),
		'inventoryId': '',
		'quantity': 0,
		'price': 0,
	}
}