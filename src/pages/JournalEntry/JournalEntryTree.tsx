import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Breadcrumbs,
    Button,
    Typography,
    Grid,
} from "@mui/material";
import Header from "../../components/Header";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { GET_JOURNAL_ENTRIES, INSERT_JOURNAL_ENTRY_URL } from '../../axios';
import useSnackBar from '../../hooks/useSnackBar';
import IJournalEntry, { EmptyJournalEntry } from '../../models/IJournalEntry';
import InsertJournalEntryForm from './InsertJournalEntryForm';
import { Add } from '@mui/icons-material';
import { ConvertDateTimeToDate } from '../../utils/Converter';

const columns: GridColDef<IJournalEntry>[] = [
    { field: "transactionNo", headerName: "Nomor Transaksi", width: 180, align: 'center', headerAlign: 'center' },
    { field: "transactionDate", headerName: "Tanggal Transaksi", width: 180, align: 'center', headerAlign: 'center', valueGetter: (params) => new Date(params.row.transactionDate).toLocaleDateString("id-ID") },
    { field: "description", headerName: "Deskripsi", width: 300 },
];

const JournalEntryTree = () => {
    const [journalEntries, setJournalEntries] = useState<Array<IJournalEntry>>([]);
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [newJournalEntry, setNewJournalEntry] = useState<IJournalEntry>(EmptyJournalEntry);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const { setSnackBar } = useSnackBar();

    useEffect(() => {
        const fetchJournalEntries = async () => {
            try {
                const response = await axiosPrivate.get(GET_JOURNAL_ENTRIES());
                const data = response.data;

                if (data.error) {
                    setSnackBar({ children: data.error, severity: 'error' });
                } else {
                    setJournalEntries(response.data);
                }
            } catch (error) {
                setSnackBar({ children: 'Terdapat kesalahan dalam mengambil data.', severity: 'error' });
            }
        };

        fetchJournalEntries();
    }, [axiosPrivate, setSnackBar]);

    const handleOnRowClicked = (params: GridRowParams<IJournalEntry>) => {
        let path: string = `detail/${params.id}`;
        navigate(path);
    };

    const handleFieldChangesCreate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewJournalEntry((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleDateFieldChangesCreate = (value: Date | null) => {
        let newValue = value || new Date();

        setNewJournalEntry((prevState) => ({
            ...prevState,
            transactionDate: ConvertDateTimeToDate(newValue),
        }));
    };

    const handleSubmitCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!submitted) {
            setSubmitted(true);

            try {
                const response = await axiosPrivate.post(INSERT_JOURNAL_ENTRY_URL(), newJournalEntry);
                const data = response.data;

                if (data.error) {
                    setSnackBar({ children: data.error, severity: 'error' });
                    setSubmitted(false);
                } else {
                    const createdJournalEntryId = data.id;
                    setSnackBar({ children: 'Data berhasil disimpan!', severity: 'success' });
                    navigate(`detail/${createdJournalEntryId}`);
                }
            } catch (error) {
                setSnackBar({ children: 'Terjadi kesalahan dalam mengirimkan data.', severity: 'error' });
                setSubmitted(false);
            }
        }
    };

    return (
        <>
            <Header title="Jurnal Umum" />
            <Box paddingBlock={1} marginBottom={3}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="text.disabled">Master Data</Typography>
                    {!openForm && <Typography color="text.primary">Jurnal Umum</Typography>}
                    {openForm && (
                        <Typography
                            onClick={() => setOpenForm(false)}
                            color="primary"
                            sx={{ textDecoration: 'none', cursor: 'pointer' }}
                        >
                            Jurnal Umum
                        </Typography>
                    )}
                    {openForm && <Typography color="text.primary">Form</Typography>}
                </Breadcrumbs>
            </Box>

            {openForm ? (
                <InsertJournalEntryForm
                    journalEntry={newJournalEntry}
                    setJournalEntry={setNewJournalEntry}
                    handleFieldChanges={handleFieldChangesCreate}
                    handleDateFieldChanges={handleDateFieldChangesCreate}
                    handleSubmit={handleSubmitCreate}
                    isEditMode
                    autoFocus
                    onClickCancel={() => {
                        setOpenForm(false);
                        setNewJournalEntry(EmptyJournalEntry);
                    }}
                    buttonDisabled={submitted}
                />
            ) : (
                <>
                    <Grid container justifyContent="flex-start">
                        <Button startIcon={<Add />} variant="contained" color="primary" sx={{ marginBottom: "1rem" }} onClick={() => setOpenForm(true)}>
                            Tambah Data
                        </Button>
                    </Grid>

                    <Box className="box-soft-shadow" p={3} borderRadius={3} marginBottom={3}>
                        <DataGrid
                            rows={journalEntries}
                            columns={columns}
                            getRowId={(row) => row?.id}
                            onRowClick={(params) => handleOnRowClicked(params)}
                            sx={{
                                '.MuiDataGrid-cell:focus': {
                                    outline: 'none'
                                },
                                '.MuiDataGrid-cell:hover': {
                                    cursor: 'pointer'
                                }
                            }}
                        />
                    </Box>
                </>
            )}
        </>
    );
};

export default JournalEntryTree;
