import React, { useEffect, useState } from 'react';
import DataTable from '../DataTableBase';
import {TableColumn} from 'react-data-table-component';
import IBank from '../models/IBank';
import { useNavigate } from 'react-router-dom';
import InsertDataButton from '../InsertDataButton';


const columns: TableColumn<IBank>[] = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
];

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

    const HandleOnRowClicked = (row: IBank) => {
        let path: string = `detail/${row.id}`;
        navigate(path);
    }

    return <>
        <InsertDataButton />
        <DataTable columns={columns}
                        data={banks || []}
                        pagination
                        highlightOnHover
                        pointerOnHover
                        selectableRows
                        selectableRowsHighlight
                        onRowClicked={HandleOnRowClicked}
                        noDataComponent={"Data bank tidak ditemukan"}
        />
    </>
}

export default Bank;