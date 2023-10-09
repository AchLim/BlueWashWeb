interface IVendor {
    id: number;
    name: string;
    reference: string;
    address: string;
    phone_number: string;
    mobile_number: string;
    vendor_email: string;
    vendor_sales_email: string;
    bank_account_id: number;
    currency_id: number;
    account_payable: number;
}

export default IVendor;