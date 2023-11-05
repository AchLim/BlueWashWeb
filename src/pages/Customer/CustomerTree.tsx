import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Breadcrumbs,
    Button,
    Stack,
    TextField,
    Typography,
    Checkbox,
  } from "@mui/material";
import Header from "../../components/header/Header";
import { DataGrid, GridCallbackDetails, GridColDef, GridEventListener, GridRowParams } from "@mui/x-data-grid";
import { GetCustomers } from '../../axios';
import ICustomer from '../../components/models/ICustomer';

const columns: GridColDef<ICustomer>[] = [
    { field: "customerName", headerName: "Nama Pelanggan", width: 190 },
    { field: "customerCode", headerName: "Kode Pelanggan", width: 140 },
    { field: "customerAddress", headerName: "Alamat Pelanggan", width: 240 },
];

const CustomerTree = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState<Array<ICustomer>>([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            var response = await GetCustomers();
            
            var data: ICustomer[] = response.data;
            setCustomers(data);
        };

        fetchCustomers().catch(console.error);
    }, [])

    const HandleOnRowClicked = (params: GridRowParams<ICustomer>) => {
        let path: string = `detail/${params.id}`;
        navigate(path);
    }

    return (
        <>
        <Header title="Pelanggan" />
        <Box paddingBlock={1} marginBottom={3}>
            <Breadcrumbs aria-label="breadcrumb">
            <Typography color="text.disabled">Master Data</Typography>
            <Typography color="text.primary">Pelanggan</Typography>
            </Breadcrumbs>
        </Box>
        
        <Box className="box-soft-shadow" p={3} borderRadius={3} marginBottom={3}>
            <DataGrid
            rows={customers}
            columns={columns}
            getRowId={(row) => row?.id}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 25 },
                },
            }}
            onRowClick={(params) => HandleOnRowClicked(params)}
            pageSizeOptions={[5, 25]}
            />
        </Box>
        </>
    );
};

export default CustomerTree;
  