import React, { useEffect, useState } from 'react';
import DataTable from '../DataTableBase';
import {TableColumn} from 'react-data-table-component';
import IBank from '../models/IBank';
import { useNavigate } from 'react-router-dom';


const columns: TableColumn<IBank>[] = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
];

const data: IBank[] = [
    {
        id: "47730541-1123-4518-b134-305df57df9e8",
        name: 'BCA',
    },
]

function Bank() {
    const navigate = useNavigate();
    const [banks, setBanks] = useState<IBank[] | undefined>([]);
    
    const fetchBankData = async () => {
        const response = await fetch('https://localhost:44327/bank/all');
        if (!response.ok) {
            throw new Error("Invalid response!");
        }

        const data = await response.json();
        setBanks(data);
    }

    useEffect(() => {
        fetchBankData().catch(console.error);
    }, [])

    const handleOnRowClicked = (row: IBank) => {
        let path: string = `detail/${row.id}`;
        navigate(path);
    }
    
    if (banks !== undefined && banks != null) {
        return <DataTable columns={columns}
                          data={banks}
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

export default Bank;