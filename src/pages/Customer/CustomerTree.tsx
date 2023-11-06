import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Breadcrumbs,
    Button,
    Typography,
    Snackbar,
    Alert,
    Slide,
} from "@mui/material";
import Header from "../../components/header/Header";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { GetCustomers, InsertCustomer } from '../../axios';
import ICustomer, { EmptyCustomer } from '../../components/models/ICustomer';
import InsertCustomerForm from './InsertCustomerForm';
import { AlertProps } from 'reactstrap';
import SnackBar from '../../components/snackbar/Snackbar';

const columns: GridColDef<ICustomer>[] = [
    { field: "customerName", headerName: "Nama Pelanggan", width: 190 },
    { field: "customerCode", headerName: "Kode Pelanggan", width: 140 },
    { field: "customerAddress", headerName: "Alamat Pelanggan", width: 240 },
];

const CustomerTree = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState<Array<ICustomer>>([]);

    const [openForm, setOpenForm] = useState<boolean>(false);
    const [newCustomer, setNewCustomer] = useState<ICustomer>(EmptyCustomer);
    const [submitted, setSubmitted] = useState<boolean>(false);
	const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);

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

    const HandleFieldChangesCreate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCustomer((prevState: ICustomer) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }

    const HandleSubmitCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!submitted) {
            setSubmitted(true);

            var response = await InsertCustomer(newCustomer);
            if (response.status == 201) {
                setSnackbar({ children: 'Data berhasil disimpan!', severity: 'success' });
                setTimeout(() => {
                    const createdCustomerId = response.data.id;
                    navigate(`detail/${createdCustomerId}`);
                }, 1000);
            } else {
                let data = response.data;
                setSnackbar({ children: data.error, severity: 'error' });
                setSubmitted(false);
            }
        }
    }

    return (
        <>
            <Header title="Pelanggan" />
            <Box paddingBlock={1} marginBottom={3}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="text.disabled">Master Data</Typography>
                    <Typography color="text.primary">Pelanggan</Typography>
                    {openForm && <Typography color="text.primary">Form</Typography>}
                </Breadcrumbs>
            </Box>

            {
                openForm ? (
                    <InsertCustomerForm
                        customer={newCustomer}
                        handleFieldChanges={HandleFieldChangesCreate}
                        handleSubmit={HandleSubmitCreate}
                        isEditMode
                        autoFocus
                        onClickCancel={() => {
                            setOpenForm(false);
                            setNewCustomer(EmptyCustomer);
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
                )
            }
            
            <SnackBar
                snackbar={snackbar}
                setSnackbar={setSnackbar}
            />
        </>
    );
};

export default CustomerTree;
