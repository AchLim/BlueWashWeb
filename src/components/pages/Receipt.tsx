import React, {useEffect, useState} from 'react';
import IReceipt from '../models/IReceipt';
import DataTable, { TableColumn } from 'react-data-table-component';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import InsertDataButton from '../InsertDataButton';


const columns: TableColumn<IReceipt>[] = [
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

function Receipt() {
    const navigate = useNavigate();
    const [receipts, setReceipts] = useState<IReceipt[] | undefined>([]);

    const fetchReceiptData = async () => {
        const response = await fetch('https://localhost:44327/receipt/all');
        if (!response.ok) {
            throw new Error("Invalid response!");
        }

        const data = await response.json();
        setReceipts(data);
    }

    useEffect(() => {
        fetchReceiptData().catch(console.error);
    }, [])

    const handleOnRowClicked = (row: IReceipt) => {
        let path: string = `detail/${row.id}`;
        navigate(path);
    }

    

    return <>
        <InsertDataButton />
        <DataTable columns={columns}
                    data={receipts || []}
                    pagination
                    highlightOnHover
                    pointerOnHover
                    selectableRows
                    selectableRowsHighlight
                    onRowClicked={handleOnRowClicked}
                    noDataComponent={"Data struk tidak ditemukan"}
        />
    </> 
}

export default Receipt;