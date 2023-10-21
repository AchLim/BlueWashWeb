import React, { useEffect, useState } from 'react';
import DataTable from '../DataTableBase';
import { TableColumn } from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import InsertDataButton from '../InsertDataButton';

import ICurrency from '../models/ICurrency';
import { GetCurrencies } from '../../axios';

const columns: TableColumn<ICurrency>[] = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Code',
        selector: row => row.code,
        sortable: true,
    },
    {
        name: 'Culture',
        selector: row => row.cultureName,
        sortable: true,
    },
];

function Currency() {
    const navigate = useNavigate();
    const [currencies, setCurrencies] = useState<ICurrency[] | undefined>([]);

    useEffect(() => {
        const fetchCurrencies = async () => {
            var response = await GetCurrencies();
            
            var data = response.data;
            setCurrencies(data);
        };

        fetchCurrencies().catch(console.error);
    }, [])

    const HandleOnRowClicked = (row: ICurrency) => {
        let path: string = `detail/${row.id}`;
        navigate(path);
    }

    return <>
        {/* <InsertDataButton /> */}
        <DataTable columns={columns}
                        data={currencies || []}
                        pagination
                        highlightOnHover
                        pointerOnHover
                        selectableRows
                        selectableRowsHighlight
                        onRowClicked={HandleOnRowClicked}
                        noDataComponent={"Data Mata Uang tidak ditemukan"}
        />
    </>
}

export default Currency;