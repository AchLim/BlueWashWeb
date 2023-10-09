import React from 'react';
import DataTable, { TableProps } from 'react-data-table-component';
import {Checkbox} from '@mui/material';
import {ArrowDownward} from '@mui/icons-material'

const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: (isIndeterminate: boolean) => isIndeterminate };

function DataTableBase<T>(props: TableProps<T>): JSX.Element {
    return (
        <DataTable
            pagination
            selectableRowsComponent={Checkbox}
            selectableRowsComponentProps={selectProps}
            sortIcon={sortIcon}
            dense
            {...props}
        />
    );
}

export default DataTableBase;