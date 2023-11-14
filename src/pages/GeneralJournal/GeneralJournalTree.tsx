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
import { GET_GENERAL_JOURNAL_HEADERS_URL, INSERT_GENERAL_JOURNAL_HEADER_URL } from '../../axios';
import useSnackBar from '../../hooks/useSnackBar';
import IGeneralJournalHeader, { EmptyGeneralJournal } from '../../models/IGeneralJournal';
import InsertGeneralJournalForm from './InsertGeneralJournalForm';
import { Add } from '@mui/icons-material';

const columns: GridColDef<IGeneralJournalHeader>[] = [
    { field: "transactionNo", headerName: "Nomor Transaksi", width: 180, align: 'center', headerAlign: 'center' },
    { field: "transactionDate", headerName: "Tanggal Transaksi", width: 180, align: 'center', headerAlign: 'center', valueGetter: (params) => new Date(params.row.transactionDate).toLocaleDateString("id-ID") },
    { field: "description", headerName: "Deskripsi", width: 300 },
];

const GeneralJournalTree = () => {
    const [generalJournals, setGeneralJournals] = useState<Array<IGeneralJournalHeader>>([]);
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [newGeneralJournal, setNewGeneralJournal] = useState<IGeneralJournalHeader>(EmptyGeneralJournal);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const { setSnackBar } = useSnackBar();

    useEffect(() => {
        const fetchGeneralJournals = async () => {
            try {
                const response = await axiosPrivate.get(GET_GENERAL_JOURNAL_HEADERS_URL());
                const data = response.data;

                if (data.error) {
                    setSnackBar({ children: data.error, severity: 'error' });
                } else {
                    setGeneralJournals(response.data);
                }
            } catch (error) {
                setSnackBar({ children: 'Terdapat kesalahan dalam mengambil data.', severity: 'error' });
            }
        };

        fetchGeneralJournals();
    }, [axiosPrivate, setSnackBar]);

    const handleOnRowClicked = (params: GridRowParams<IGeneralJournalHeader>) => {
        let path: string = `detail/${params.id}`;
        navigate(path);
    };

    const handleFieldChangesCreate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewGeneralJournal((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleDateFieldChangesCreate = (value: Date | null) => {
        let newValue = value || new Date();

        setNewGeneralJournal((prevState) => ({
            ...prevState,
            transactionDate: newValue,
        }));
    };

    const handleSubmitCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!submitted) {
            setSubmitted(true);

            try {
                const response = await axiosPrivate.post(INSERT_GENERAL_JOURNAL_HEADER_URL(), newGeneralJournal);
                const data = response.data;

                if (data.error) {
                    setSnackBar({ children: data.error, severity: 'error' });
                    setSubmitted(false);
                } else {
                    const createdGeneralJournalId = data.id;
                    setSnackBar({ children: 'Data berhasil disimpan!', severity: 'success' });
                    navigate(`detail/${createdGeneralJournalId}`);
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
                <InsertGeneralJournalForm
                    generalJournal={newGeneralJournal}
                    setGeneralJournal={setNewGeneralJournal}
                    handleFieldChanges={handleFieldChangesCreate}
                    handleDateFieldChanges={handleDateFieldChangesCreate}
                    handleSubmit={handleSubmitCreate}
                    isEditMode
                    autoFocus
                    onClickCancel={() => {
                        setOpenForm(false);
                        setNewGeneralJournal(EmptyGeneralJournal);
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
                            rows={generalJournals}
                            columns={columns}
                            getRowId={(row) => row?.id}
                            onRowClick={(params) => handleOnRowClicked(params)}
                        />
                    </Box>
                </>
            )}
        </>
    );
};

export default GeneralJournalTree;
