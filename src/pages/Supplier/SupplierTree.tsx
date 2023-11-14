import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Breadcrumbs,
    Typography,
  } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { GET_SUPPLIERS_URL } from '../../axios';
import ISupplier from '../../models/ISupplier';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useSnackBar from '../../hooks/useSnackBar';

const columns: GridColDef<ISupplier>[] = [
    { field: "supplierName", headerName: "Nama Pemasok", width: 190 },
    { field: "supplierCode", headerName: "Kode Pemasok", width: 140 },
    { field: "supplierAddress", headerName: "Alamat Pemasok", width: 240 },
];

const SupplierTree = () => {
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState<Array<ISupplier>>([]);
    
    const axiosPrivate = useAxiosPrivate();
    const { setSnackBar } = useSnackBar();

    useEffect(() => {
        const fetchSuppliers = async () => {
            var response = await axiosPrivate.get(GET_SUPPLIERS_URL());
            const data = response.data;
            if (data.error) {
                setSnackBar({ children: data.error, severity: 'error' })
            } else {
                setSuppliers(data);
            }
        };

        fetchSuppliers().catch(console.error);
    }, [])

    const HandleOnRowClicked = (params: GridRowParams<ISupplier>) => {
        let path: string = `detail/${params.id}`;
        navigate(path);
    }

    return (
        <>
        <Header title="Pemasok" />
        <Box paddingBlock={1} marginBottom={3}>
            <Breadcrumbs aria-label="breadcrumb">
            <Typography color="text.disabled">Master Data</Typography>
            <Typography color="text.primary">Pemasok</Typography>
            </Breadcrumbs>
        </Box>
        
        <Box className="box-soft-shadow" p={3} borderRadius={3} marginBottom={3}>
            <DataGrid
            rows={suppliers}
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

export default SupplierTree;
  