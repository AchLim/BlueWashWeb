import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Breadcrumbs,
    Button,
    Stack,
    Typography,
} from "@mui/material";
import Header from "../../components/Header";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import IInventory, { EmptyInventory } from '../../models/IInventory';
import InsertInventoryForm from './InsertInventoryForm';
import { AlertProps } from 'reactstrap';
import SnackBar from '../../components/SnackBar';
import { GET_INVENTORIES_URL, INSERT_INVENTORY_URL } from '../../axios';
import useSnackBar from '../../hooks/useSnackBar';

const columns: GridColDef<IInventory>[] = [
    { field: "itemNo", headerName: "Kode Barang", width: 140 },
    { field: "itemName", headerName: "Nama Barang", width: 210 },
];

const InventoryTree = () => {
    const [inventories, setInventories] = useState<Array<IInventory>>([]);

    const [openForm, setOpenForm] = useState<boolean>(false);
    const [newInventory, setNewInventory] = useState<IInventory>(EmptyInventory);

    const [submitted, setSubmitted] = useState<boolean>(false);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { setSnackBar } = useSnackBar();

    useEffect(() => {
        const getInventories = async () => {
            const response = await axiosPrivate.get(GET_INVENTORIES_URL());
            const data = response.data;

            if (data.error)
                setSnackBar({ children: data.error, severity: 'error' });
            else
                setInventories(response.data);
        }

        getInventories();
    }, [])

    const HandleOnRowClicked = (params: GridRowParams<IInventory>) => {
        let path: string = `detail/${params.id}`;
        navigate(path);
    }

    const HandleFieldChangesCreate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewInventory((prevState: IInventory) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }

    const HandleSubmitCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!submitted) {
            setSubmitted(true);

            var response = await axiosPrivate.post(INSERT_INVENTORY_URL(), newInventory);
            if (response.status == 201) {
                const createdInventoryId = response.data.id;
                setSnackBar({ children: 'Data berhasil disimpan!', severity: 'success' });
                navigate(`detail/${createdInventoryId}`);
            } else {
                let data = response.data;
                setSnackBar({ children: data.error, severity: 'error' });
                setSubmitted(false);
            }
        }
    }

    return (
        <>
            <Header title="Persediaan" />
            <Box paddingBlock={1} marginBottom={3}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="text.disabled">Master Data</Typography>
                    {!openForm && <Typography color="text.primary">Persediaan</Typography>}
                    {openForm &&
                        <Typography
                            onClick={() => setOpenForm(false)}
                            color="primary"
                            sx={{ textDecoration: 'none', cursor: 'pointer' }}
                        >
                            Persediaan
                        </Typography>
                    }
                    {openForm && <Typography color="text.primary">Form</Typography>}
                </Breadcrumbs>
            </Box>

            {
                openForm ? (
                    <InsertInventoryForm
                        inventory={newInventory}
                        handleFieldChanges={HandleFieldChangesCreate}
                        handleSubmit={HandleSubmitCreate}
                        isEditMode
                        autoFocus
                        onClickCancel={() => {
                            setOpenForm(false);
                            setNewInventory(EmptyInventory);
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

                        <Box className="box-soft-shadow" p={3} borderRadius={3} marginBottom={3} height={300}>
                            <DataGrid
                                rows={inventories}
                                columns={columns}
                                getRowId={(row) => row?.id}
                                onRowClick={(params) => HandleOnRowClicked(params)}
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
                                }}
                            />
                        </Box>
                    </>
                )
            }
        </>
    );
};

export default InventoryTree;
