import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Breadcrumbs,
    Typography,
    Checkbox,
  } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import ILaundryService from '../../models/ILaundryService';
import { GET_LAUNDRYSERVICES_URL } from '../../axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useSnackBar from '../../hooks/useSnackBar';

const columns: GridColDef<ILaundryService>[] = [
    { field: "name", headerName: "Nama Tipe", width: 350 },
    { field: "laundryProcessWash", headerName: "Cuci", width: 160, renderCell: (params) => {return (<Checkbox checked={params.value} disabled />) } },
    { field: "laundryProcessDry", headerName: "Kering", width: 160, renderCell: (params) => {return (<Checkbox checked={params.value} disabled />) } },
    { field: "laundryProcessIron", headerName: "Setrika", width: 160, renderCell: (params) => {return (<Checkbox checked={params.value} disabled />) } },
];

const ServiceTree = () => {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const { setSnackBar } = useSnackBar();
    
    const [laundryServices, setLaundryServices] = useState<ILaundryService[]>([]);

    useEffect(() => {
        const fetchLaundryServices = async () => {
            var response = await axiosPrivate.get(GET_LAUNDRYSERVICES_URL());
            const data = response.data;
            if (data.error) {
                setSnackBar({ children: data.error, severity: 'error' })
            } else {
                setLaundryServices(data);
            }
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
  