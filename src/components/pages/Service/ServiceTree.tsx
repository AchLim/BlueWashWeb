import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Breadcrumbs,
    Button,
    Stack,
    TextField,
    Typography,
    IconButton,
    Toolbar,
    Checkbox,
  } from "@mui/material";
import Header from "../../header/Header";
import { Add, ArrowBack, ArrowForward } from "@mui/icons-material";
import { DataGrid, GridCallbackDetails, GridColDef, GridEventListener, GridRowParams } from "@mui/x-data-grid";
import ILaundryService, { ProcessLaundryServiceDisplayName } from '../../models/ILaundryService';
import { GetLaundryServices } from '../../../axios';

const columns: GridColDef<ILaundryService>[] = [
    { field: "name", headerName: "Nama Tipe", width: 350 },
    { field: "wash", headerName: "Cuci", width: 160, renderCell: (params) => {return (<Checkbox checked={params.value} disabled />) } },
    { field: "dry", headerName: "Kering", width: 160, renderCell: (params) => {return (<Checkbox checked={params.value} disabled />) } },
    { field: "iron", headerName: "Setrika", width: 160, renderCell: (params) => {return (<Checkbox checked={params.value} disabled />) } },
];

const ServiceTree = () => {
    const navigate = useNavigate();
    const [laundryServices, setLaundryServices] = useState<ILaundryService[]>([]);

    useEffect(() => {
        const fetchLaundryServices = async () => {
            var response = await GetLaundryServices();
            
            var data: ILaundryService[] = response.data;
            data.map(services => {
                ProcessLaundryServiceDisplayName(services);
            });
            setLaundryServices(data);
        };

        fetchLaundryServices().catch(console.error);
    }, [])

    const HandleOnRowClicked = (params: GridRowParams<ILaundryService>) => {
        let path: string = `detail/${params.id}`;
        navigate(path);
    }

    return (
        <>
        <Header title="Service" />
        <Box paddingBlock={1} marginBottom={3}>
            <Breadcrumbs aria-label="breadcrumb">
            <Typography color="text.disabled">Master Data</Typography>
            <Typography color="text.primary">Tipe Laundry</Typography>
            </Breadcrumbs>
        </Box>
        
        <Box className="box-soft-shadow" p={3} borderRadius={3} marginBottom={3}>
            <DataGrid
            rows={laundryServices || []}
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

export default ServiceTree;
  