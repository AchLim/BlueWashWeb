interface IReceiptLine {
    id: number;
    receiptId: number;
    name: string;
    date: Date;
    description: string;
    productId: number;
    quantity: number;
    unitOfMeasureId: number;
    unitPrice: number;
    discountPrice: number;
    subTotal: number;
}

export default IReceiptLine;