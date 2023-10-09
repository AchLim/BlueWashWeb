import IPurchaseOrderLine from "./IPurchaseOrderLine";
import moment from 'moment'
import IVendor from "./IVendor";
import ICurrency from "./ICurrency";

interface IPurchaseOrder {
    id: number;
    name: string;
    vendor: IVendor;
    vendorId: number;
    date: Date;
    vendorReference: string;
    currency: ICurrency;
    currencyId: number;
    taxInclusive: string;
    purposeOfPurchase: string;
    totalAmount: number;

    purchaseOrderLines: Array<IPurchaseOrderLine>;
}

export default IPurchaseOrder;