interface IPurchaseOrderLine {
    id: number;
    purchase_order_id: number;
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

export default IPurchaseOrderLine;