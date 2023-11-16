import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Breadcrumbs,
    Button,
    SelectChangeEvent,
    Stack,
    Typography,
} from "@mui/material";
import Header from "../../components/Header";
import { DataGrid, GridColDef, GridRowParams, GridToolbar } from "@mui/x-data-grid";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { GET_CHART_OF_ACCOUNTS_URL, INSERT_CHART_OF_ACCOUNT_URL } from '../../axios';
import useSnackBar from '../../hooks/useSnackBar';
import IChartOfAccount, { EmptyChartOfAccount, GetAccountHeaderNameByNo } from '../../models/IChartOfAccount';
import InsertChartOfAccountForm from './InsertChartOfAccountForm';

const columns: GridColDef<IChartOfAccount>[] = [
    { field: "accountHeaderNo", headerName: "Kode Akun Header", width: 140, align: 'center', headerAlign: 'center' },
    { field: "accountHeaderName", headerName: "Nama Akun Header", width: 240, align: 'left', headerAlign: 'left' },
    { field: "accountNo", headerName: "Kode Akun Detail", width: 140, align: 'center', headerAlign: 'center' },
    { field: "accountName", headerName: "Nama Akun Detail", width: 280, align: 'left', headerAlign: 'left' },
];

const ChartOfAccountTree = () => {
    const [chartOfAccounts, setChartOfAccounts] = useState<Array<IChartOfAccount>>([]);

    const [openForm, setOpenForm] = useState<boolean>(false);
    const [newChartOfAccount, setNewChartOfAccounts] = useState<IChartOfAccount>(EmptyChartOfAccount);

    const [submitted, setSubmitted] = useState<boolean>(false);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const { setSnackBar } = useSnackBar();

    useEffect(() => {
        const getCustomers = async () => {
            const response = await axiosPrivate.get(GET_CHART_OF_ACCOUNTS_URL());
            const data = response.data;

            if (data.error)
                setSnackBar({ children: data.error, severity: 'error' });
            else
                setChartOfAccounts(response.data);
        }

        getCustomers();
    }, [])

    const handleOnRowClicked = (params: GridRowParams<IChartOfAccount>) => {
        let path: string = `detail/${params.id}`;
        navigate(path);
    }

    const handleFieldChangesCreate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewChartOfAccounts((prevState: IChartOfAccount) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }

    const handleSelectAccountHeader = (event: SelectChangeEvent) => {
        let accountHeaderNo: number | string = parseInt(event.target.value);
        if (isNaN(accountHeaderNo)) {
            accountHeaderNo = '';
        }

        let accountHeaderName: string = GetAccountHeaderNameByNo(accountHeaderNo);
        setNewChartOfAccounts((prevState: IChartOfAccount) => ({
            ...prevState,
            [event.target.name]: event.target.value,
            accountHeaderName: accountHeaderName,
        }));
    }

    const handleSubmitCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!submitted) {
            setSubmitted(true);

            const response = await axiosPrivate.post(INSERT_CHART_OF_ACCOUNT_URL(), newChartOfAccount);
            const data = response.data;

            if (data.error) {
                setSnackBar({ children: data.error, severity: 'error' });
                setSubmitted(false);
            } else {
                const createdChartOfAccountId = data.id;
                setSnackBar({ children: 'Data berhasil disimpan!', severity: 'success' });
                navigate(`detail/${createdChartOfAccountId}`);
            }
        }
    }

    return (
        <>
            <Header title="Kode Akun" />
            <Box paddingBlock={1} marginBottom={3}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="text.disabled">Master Data</Typography>
                    {!openForm && <Typography color="text.primary">Kode Akun</Typography>}
                    {openForm &&
                        <Typography
                            onClick={() => setOpenForm(false)}
                            color="primary"
                            sx={{ textDecoration: 'none', cursor: 'pointer' }}
                        >
                            Kode Akun
                        </Typography>
                    }
                    {openForm && <Typography color="text.primary">Form</Typography>}
                </Breadcrumbs>
            </Box>

            {
                openForm ? (
                    <InsertChartOfAccountForm
                        chartOfAccount={newChartOfAccount}
                        handleFieldChanges={handleFieldChangesCreate}
                        handleSelectAccountHeader={handleSelectAccountHeader}
                        handleSubmit={handleSubmitCreate}
                        isEditMode
                        autoFocus
                        onClickCancel={() => {
                            setOpenForm(false);
                            setNewChartOfAccounts(EmptyChartOfAccount);
                        }}

                        buttonDisabled={submitted}
                    />
                ) : (
                    <>
                        <Box display={"flex"}>
                            <Button variant="contained" color="primary" sx={{ marginBottom: "1rem" }} onClick={() => setOpenForm(true)}>
                                Tambah Data
                            </Button>
                        </Box>

                        <Box className="box-soft-shadow" p={3} borderRadius={3} marginBottom={3}>
                            <DataGrid
                                rows={chartOfAccounts}
                                columns={columns}
                                getRowId={(row) => row?.id}
                                onRowClick={(params) => handleOnRowClicked(params)}
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
                )
            }
        </>
    );
};

export default ChartOfAccountTree;
