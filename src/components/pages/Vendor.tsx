import React, { useEffect, useState } from 'react';
import DataTable from '../DataTableBase';
import {TableColumn} from 'react-data-table-component';
import IVendor from '../models/IVendor';
import { useNavigate } from 'react-router-dom';


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
        selector: row => row.phone_number,
    },
    {
        name: 'Mobile Number',
        selector: row => row.mobile_number,
    },
    {
        name: 'Vendor Email',
        selector: row => row.vendor_email,
    },
    {
        name: 'Vendor Sales Email',
        selector: row => row.vendor_sales_email,
    },
    {
        name: 'Bank Account',
        selector: row => row.bank_account_id,
    },
    {
        name: 'Currency',
        selector: row => row.currency_id,
    },
    {
        name: 'Account Payable',
        selector: row => row.account_payable,
        sortable: true,
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
    
    if (vendors !== undefined && vendors != null) {
        return <DataTable columns={columns}
                          data={vendors}
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

export default Vendor;