import React, {useEffect, useState} from 'react';
import IPurchaseOrder from '../models/IPurchaseOrder';
import DataTable, { TableColumn } from 'react-data-table-component';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';


const columns: TableColumn<IPurchaseOrder>[] = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Date',
        selector: row => moment(row.date).format("DD-MM-YYYY"),
        sortable: true,
    },
    {
        name: 'Vendor',
        selector: row => row.vendor && row.vendor.name || '',
    },
    {
        name: 'Vendor Reference',
        selector: row => row.vendorReference,
    },
    {
        name: 'Currency',
        selector: row => row.currency && row.currency.name || '',
    },
    {
        name: 'Tax Inclusive',
        selector: row => row.taxInclusive && 'Yes' || 'No',
    },
    {
        name: 'Total Amount',
        selector: row => {
            let result: string = row.totalAmount.toString();
            if (row.currency) {
                result = `${row.currency.abbreviation} ${result}`;
            }

            return result;
        },
    },
];

function PurchaseOrder() {
    const navigate = useNavigate();
    const [purchaseOrders, setPurchaseOrders] = useState<IPurchaseOrder[] | undefined>([]);

    const fetchPurchaseOrderData = async () => {
        const response = await fetch('https://localhost:44327/purchaseorder/all');
        if (!response.ok) {
            throw new Error("Invalid response!");
        }

        const data = await response.json();
        setPurchaseOrders(data);
    }

    useEffect(() => {
        fetchPurchaseOrderData().catch(console.error);
    }, [])

    const handleOnRowClicked = (row: IPurchaseOrder) => {
        let path: string = `detail/${row.id}`;
        navigate(path);
    }
    
    if (purchaseOrders !== undefined && purchaseOrders != null) {
        return <DataTable columns={columns}
                          data={purchaseOrders}
                          pagination
                          highlightOnHover
                          pointerOnHover
                          selectableRows
                          selectableRowsHighlight
                          onRowClicked={handleOnRowClicked}
                          />;
    }

    return <h4>Records not found.</h4>
}

export default PurchaseOrder;