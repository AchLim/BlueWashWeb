import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Breadcrumbs,
    Button,
    Typography,
    Grid,
    Stack,
} from "@mui/material";
import Header from "../../components/Header";
import { DataGrid, GridColDef, GridRowParams, GridToolbar } from "@mui/x-data-grid";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { GET_PURCHASE_HEADERS_URL, INSERT_PURCHASE_HEADER_URL } from '../../axios';
import useSnackBar from '../../hooks/useSnackBar';
import InsertPurchaseHeaderForm from './InsertPurchaseHeaderForm';
import { Add } from '@mui/icons-material';
import { ConvertDateTimeToDate, ConvertDateToLocaleDate } from '../../utils/Converter';
import IPurchaseHeader, { EmptyPurchaseHeader } from '../../models/IPurchase';

const columns: GridColDef<IPurchaseHeader>[] = [
    { field: "purchaseNo", headerName: "Nomor Transaksi", width: 180, align: 'center', headerAlign: 'center' },
    { field: "purchaseDate", headerName: "Tanggal Transaksi", width: 180, align: 'center', headerAlign: 'center', valueGetter: (params) => ConvertDateToLocaleDate(params.row.purchaseDate) },
    { field: "supplierName", headerName: "Nama Pemasok", width: 240, valueGetter: (params) => params.row.supplier.supplierName },
    { field: "description", headerName: "Deskripsi", width: 300 },
];

const PurchaseTree = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const { setSnackBar } = useSnackBar();

    const [purchaseHeaders, setPurchaseHeaders] = useState<Array<IPurchaseHeader>>([]);
    const [openForm, setOpenForm] = useState<boolean>(false);

    const [newPurchaseHeader, setNewPurchaseHeader] = useState<IPurchaseHeader>(EmptyPurchaseHeader);
    const [submitted, setSubmitted] = useState<boolean>(false);

    useEffect(() => {
        const fetchPurchaseHeaders = async () => {
            try {
                const response = await axiosPrivate.get(GET_PURCHASE_HEADERS_URL());
                const data = response.data;

                if (data.error) {
                    setSnackBar({ children: data.error, severity: 'error' });
                } else {
                    setPurchaseHeaders(response.data);
                }
            } catch (error) {
                setSnackBar({ children: 'Terdapat kesalahan dalam mengambil data.', severity: 'error' });
            }
        };

        fetchPurchaseHeaders();
    }, []);

    const handleOnRowClicked = (params: GridRowParams<IPurchaseHeader>) => {
        let path: string = `detail/${params.id}`;
        navigate(path);
    };

    const handleFieldChangesCreate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPurchaseHeader((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleDateFieldChangesCreate = (value: Date | null) => {
        let newValue = value || new Date();

        setNewPurchaseHeader((prevState) => ({
            ...prevState,
            purchaseDate: ConvertDateTimeToDate(newValue),
        }));
    };

    const handleSubmitCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!submitted) {
            setSubmitted(true);

            try {
                const response = await axiosPrivate.post(INSERT_PURCHASE_HEADER_URL(), newPurchaseHeader);
                const data = response.data;

                if (data.error) {
                    setSnackBar({ children: data.error, severity: 'error' });
                    setSubmitted(false);
                } else {
                    const createdPurchaseHeaderId = data.id;
                    setSnackBar({ children: 'Data berhasil disimpan!', severity: 'success' });
                    navigate(`detail/${createdPurchaseHeaderId}`);
                }
            } catch (error) {
                setSnackBar({ children: 'Terjadi kesalahan dalam mengirimkan data.', severity: 'error' });
                setSubmitted(false);
            }
        }
    };

    return (
        <>
            <Header title="Pembelian" />
            <Box paddingBlock={1} marginBottom={3}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="text.disabled">Master Data</Typography>
                    {!openForm && <Typography color="text.primary">Pembelian</Typography>}
                    {openForm && (
                        <Typography
                            onClick={() => setOpenForm(false)}
                            color="primary"
                            sx={{ textDecoration: 'none', cursor: 'pointer' }}
                        >
                            Pembelian
                        </Typography>
                    )}
                    {openForm && <Typography color="text.primary">Form</Typography>}
                </Breadcrumbs>
            </Box>

            {openForm ? (
                <InsertPurchaseHeaderForm
                    purchaseHeader={newPurchaseHeader}
                    setPurchaseHeader={setNewPurchaseHeader}
                    handleFieldChanges={handleFieldChangesCreate}
                    handleDateFieldChanges={handleDateFieldChangesCreate}
                    handleSubmit={handleSubmitCreate}
                    isEditMode
                    autoFocus
                    onClickCancel={() => {
                        setOpenForm(false);
                        setNewPurchaseHeader(EmptyPurchaseHeader);
                    }}
                    buttonDisabled={submitted}
                />
            ) : (
                <>
                    <Grid container justifyContent="flex-start">
                        <Button startIcon={<Add />} variant="contained" color="primary" sx={{ marginBottom: "1rem" }} onClick={() => {
                            setOpenForm(true)
                            setNewPurchaseHeader(EmptyPurchaseHeader);
                        }}>
                            Tambah Data
                        </Button>
                    </Grid>

                    <Box className="box-soft-shadow" p={3} borderRadius={3} marginBottom={3}>
                        <DataGrid
                            rows={purchaseHeaders}
                            columns={columns}
                            getRowId={(row) => row?.id}
                            onRowClick={(params) => handleOnRowClicked(params)}
                            autoHeight
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
            )}
        </>
    );
};

export default PurchaseTree;
