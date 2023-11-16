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
import Header from "../../components/Header";
import { DataGrid, GridColDef, GridRowParams, GridToolbar } from "@mui/x-data-grid";
import IPriceMenu from "../../models/IPriceMenu";
import { GET_PRICEMENUS_URL } from '../../axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useSnackBar from '../../hooks/useSnackBar';

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
    const axiosPrivate = useAxiosPrivate();
    const { setSnackBar } = useSnackBar();

    useEffect(() => {
        const fetchPriceMenus = async () => {
            const response = await axiosPrivate.get(GET_PRICEMENUS_URL());
            const data = response.data;
            if (data.error) {
                setSnackBar({ children: data.error, severity: 'error' })
            } else {
                setPriceMenus(data);
            }
        };

        fetchPriceMenus().catch(console.error);
    }, [])

    const HandleOnRowClicked = (params: GridRowParams<IPriceMenu>) => {
        let path: string = `detail/${params.id}`;
        navigate(path);
    }

    return (
        <>
            <Header title="Menu Harga" />
            <Box paddingBlock={1} marginBottom={3}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="text.disabled">Master Data</Typography>
                    <Typography color="text.primary">Menu Harga</Typography>
                </Breadcrumbs>
            </Box>

            <Box className="box-soft-shadow" p={3} borderRadius={3} marginBottom={3}>
                <DataGrid
                    rows={priceMenus}
                    columns={columns}
                    getRowId={(row) => row?.priceMenuId}
                    onRowClick={(params) => HandleOnRowClicked(params)}
                    sx={{
                        '.MuiDataGrid-cell:focus': {
                            outline: 'none'
                        },
                        '.MuiDataGrid-cell:hover': {
                            cursor: 'pointer'
                        },
                    }}
                    slots={{
                        noRowsOverlay: () => (
                            <Stack height="100%" alignItems={'center'} justifyContent={'center'}>
                                Data kosong.
                            </Stack>
                        ),
                        noResultsOverlay: () => (
                            <Stack height="100%" alignItems={'center'} justifyContent={'center'}>
                                Data tidak ditemukan.
                            </Stack>
                        ),
                        toolbar: GridToolbar
                    }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: {
                                debounceMs: 300
                            }
                        }
                    }}
                />
            </Box>
        </>
    );
};

export default PriceMenuTree;
