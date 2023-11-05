import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Breadcrumbs,
    Button,
    Stack,
    TextField,
    Typography,
    IconButton,
  } from "@mui/material";
import Header from "../../components/header/Header";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import IPriceMenu from "../../components/models/IPriceMenu";
import { GetPriceMenus } from '../../axios';

const columns: GridColDef<IPriceMenu>[] = [
    { field: "name", headerName: "Nama", width: 170 },
    { field: "priceDisplay", headerName: "Harga", width: 170 },
    { field: "pricingOptionDisplay", headerName: "Satuan", width: 170 },
    { field: "processingTimeDisplay", headerName: "Waktu Pengerjaan", width: 170 },
    { field: "deliveryOptionDisplay", headerName: "Opsi Pengerjaan", width: 170 },
];


const PriceMenuTree = () => {
    const navigate = useNavigate();
    const [priceMenus, setPriceMenus] = useState<IPriceMenu[]>([]);

    useEffect(() => {
        const fetchLaundryServices = async () => {
            var response = await GetPriceMenus();
            
            var data: IPriceMenu[] = response.data;
            setPriceMenus(data);
        };

        fetchLaundryServices().catch(console.error);
    }, [])

    const HandleOnRowClicked = (params: GridRowParams<IPriceMenu>) => {
        let path: string = `detail/${params.id}`;
        navigate(path);
    }

    return (
        <>
        <Header title="Price Menu" />
        <Box paddingBlock={1} marginBottom={3}>
            <Breadcrumbs aria-label="breadcrumb">
            <Typography color="text.disabled">Master Data</Typography>
            <Typography color="text.primary">Price Menu</Typography>
            </Breadcrumbs>
        </Box>
        
        <Box className="box-soft-shadow" p={3} borderRadius={3} marginBottom={3}>
            <DataGrid
            rows={priceMenus}
            columns={columns}
            getRowId={(row) => row?.priceMenuId}
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

export default PriceMenuTree;
  