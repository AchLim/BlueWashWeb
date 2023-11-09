import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Breadcrumbs,
    Button,
    Typography,
} from "@mui/material";
import Header from "../../components/header/Header";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ICustomer, { EmptyCustomer } from '../../components/models/ICustomer';
import InsertCustomerForm from './InsertCustomerForm';
import { AlertProps } from 'reactstrap';
import SnackBar from '../../components/SnackBar';
import { GET_CUSTOMERS_URL, INSERT_CUSTOMER_URL } from '../../axios';
import useSnackBar from '../../hooks/useSnackBar';

const columns: GridColDef<ICustomer>[] = [
    { field: "customerName", headerName: "Nama Pelanggan", width: 190 },
    { field: "customerCode", headerName: "Kode Pelanggan", width: 140 },
    { field: "customerAddress", headerName: "Alamat Pelanggan", width: 240 },
];

const CustomerTree = () => {
    const [customers, setCustomers] = useState<Array<ICustomer>>([]);

    const [openForm, setOpenForm] = useState<boolean>(false);
    const [newCustomer, setNewCustomer] = useState<ICustomer>(EmptyCustomer);

    const [submitted, setSubmitted] = useState<boolean>(false);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { setSnackBar } = useSnackBar();

    useEffect(() => {
        const getCustomers = async () => {
            const response = await axiosPrivate.get(GET_CUSTOMERS_URL());
            const data = response.data;

            if (data.error)
                setSnackBar({ children: data.error, severity: 'error' });
            else
                setCustomers(response.data);
        }

        getCustomers();
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

            var response = await axiosPrivate.post(INSERT_CUSTOMER_URL(), newCustomer);
            if (response.status == 201) {
                setSnackBar({ children: 'Data berhasil disimpan!', severity: 'success' });
                setTimeout(() => {
                    const createdCustomerId = response.data.id;
                    navigate(`detail/${createdCustomerId}`);
                }, 1000);
            } else {
                let data = response.data;
                setSnackBar({ children: data.error, severity: 'error' });
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
        </>
    );
};

export default CustomerTree;
