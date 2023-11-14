import IReceiptLine from "./IReceiptLine";
import moment from 'moment'
import IVendor from "./IVendor";
import ICurrency from "./ICurrency";

interface IReceipt {
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

    receiptLines: Array<IReceiptLine>;
}

export default IReceipt;