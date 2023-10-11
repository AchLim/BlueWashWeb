import React, { useEffect, useState } from 'react';
import DataTable from '../DataTableBase';
import {TableColumn} from 'react-data-table-component';
import IVendor from '../models/IVendor';
import { useNavigate } from 'react-router-dom';
import InsertDataButton from '../InsertDataButton';


const columns: TableColumn<IVendor>[] = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Reference',
        selector: row => row.reference,
        sortable: true,
    },
    {
        name: 'Address',
        selector: row => row.address,
    },
    {
        name: 'Phone Number',
        selector: row => row.phoneNumber,
    },
    {
        name: 'Mobile Number',
        selector: row => row.mobileNumber,
    },
    {
        name: 'Vendor Email',
        selector: row => row.vendorEmail,
    },
    {
        name: 'Vendor Sales Email',
        selector: row => row.vendorSalesEmail,
    },
    {
        name: 'Bank Account',
        selector: row => row.bankAccountId,
    },
    {
        name: 'Currency',
        selector: row => row.currencyId,
    },
];


function Vendor() {
    const navigate = useNavigate();
    const [vendors, setVendors] = useState<IVendor[] | undefined>([]);
    
    const fetchVendorData = async () => {
        const response = await fetch('https://localhost:44327/vendor/all');
        if (!response.ok) {
            throw new Error("Invalid response!");
        }

        const data = await response.json();
        setVendors(data);
    }

    useEffect(() => {
        fetchVendorData().catch(console.error);
    }, [])

    const handleOnRowClicked = (row: IVendor) => {
        let path: string = `detail/${row.id}`;
        navigate(path);
    }

    return <>
        <InsertDataButton />
        <DataTable columns={columns}
                    data={vendors || []}
                    pagination
                    highlightOnHover
                    pointerOnHover
                    selectableRows
                    selectableRowsHighlight
                    onRowClicked={handleOnRowClicked}
                    noDataComponent={"Data pemasok tidak ditemukan"}
        />
    </> 
}

export default Vendor;