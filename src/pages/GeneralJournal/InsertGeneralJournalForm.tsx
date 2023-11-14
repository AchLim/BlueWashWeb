import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DataGrid, GridCellParams, GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';
import { Add, Delete, Edit } from '@mui/icons-material';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useSnackBar from '../../hooks/useSnackBar';
import { useNavigate } from 'react-router-dom';
import AlertDialogSlide from '../../components/AlertDialogSlide';
import { DELETE_GENERAL_JOURNAL_HEADER_URL, GET_CHART_OF_ACCOUNTS_URL } from '../../axios';
import IGeneralJournal, { EmptyGeneralJournalDetail, IGeneralJournalDetail } from '../../models/IGeneralJournal';
import IChartOfAccount, { EmptyChartOfAccount } from '../../models/IChartOfAccount';
import { v4 as uuidv4 } from 'uuid';
import id from 'date-fns/locale/id';
import { format } from 'date-fns';

interface InsertGeneralJournalFormProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleDateFieldChanges: (value: Date | null) => void;
    handleFieldChanges: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClickEdit?: () => void;
    onClickCancel: () => void;
    generalJournal: IGeneralJournal;
    setGeneralJournal: React.Dispatch<React.SetStateAction<IGeneralJournal>>;
    isEditMode: boolean;
    autoFocus?: boolean;
    buttonDisabled?: boolean;
}

const InsertGeneralJournalForm = (props: InsertGeneralJournalFormProps) => {
    // Hooks
    const axiosPrivate = useAxiosPrivate();
    const { setSnackBar } = useSnackBar();
    const navigate = useNavigate();

    // New-detail related
    const [open, setOpen] = useState<boolean>(false)
    const [newDetail, setNewDetail] = useState<IGeneralJournalDetail>(EmptyGeneralJournalDetail);

    // Edit-selected related
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [selectedDetail, setSelectedDetail] = useState<IGeneralJournalDetail>(EmptyGeneralJournalDetail);

    // Delete Detail Line
    const [openDeleteSelectedDetailDialog, setOpenDeleteSelectedDetailDialog] = useState<boolean>(false);

    // Chart of Accounts
    const [chartOfAccounts, setChartOfAccounts] = useState<Array<IChartOfAccount>>([]);

    // Delete Header
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

    useEffect(() => {
        const getChartOfAccounts = async () => {
            const response = await axiosPrivate.get(GET_CHART_OF_ACCOUNTS_URL());
            const data = response.data;
            if (!data.error) {
                setChartOfAccounts(data);
            }
        };
        getChartOfAccounts();
    }, [axiosPrivate]);

    const handleOnClick = () => {
        if (!props.generalJournal.id.trim()) {
            return;
        }
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        const response = await axiosPrivate.delete(DELETE_GENERAL_JOURNAL_HEADER_URL(props.generalJournal.id));
        const data = response.data;

        if (data.error) {
            setSnackBar({ children: data.error, severity: 'error' });
        } else {
            navigate('/general-journal-tree');
            setSnackBar({ children: 'Data berhasil dihapus.', severity: 'success' });
        }

        setOpenDeleteDialog(false);
    };

    const handleCancelDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleAddRow = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newDetailWithId = {
            ...newDetail,
            generalJournalDetailId: uuidv4(),
        };

        props.setGeneralJournal((prevHeader) => {
            if (newDetail && newDetail.chartOfAccountId) {
                return {
                    ...prevHeader,
                    generalJournalDetails: prevHeader.generalJournalDetails.length > 0
                        ? [...prevHeader.generalJournalDetails, ...[newDetailWithId]]
                        : [newDetailWithId],
                };
            }

            return prevHeader;
        });

        setNewDetail(EmptyGeneralJournalDetail());
        handleCloseDialog();
    };

    const handleNewDetailOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewDetail((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSelectChartOfAccount = (event: SelectChangeEvent) => {
        const chartOfAccountId = event.target.value as string;
        const coaRecord = chartOfAccounts.find((coa) => coa.id === chartOfAccountId);
        setNewDetail((prevState) => ({
            ...prevState,
            chartOfAccount: coaRecord || EmptyChartOfAccount(),
            chartOfAccountId: chartOfAccountId,
        }));
    };

    const handleOpenEditDialog = () => {
        setOpenEdit(true);
    }

    const handleCloseEditDialog = () => {
        setOpenEdit(false);
        setSelectedDetail(EmptyGeneralJournalDetail());
    }

    const handleEditRow = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        props.setGeneralJournal((prevHeader) => {
            const updatedDetails = prevHeader.generalJournalDetails.map((detail) =>
                detail.generalJournalDetailId === selectedDetail.generalJournalDetailId
                    ? selectedDetail // Replace existing detail
                    : detail
            );

            return {
                ...prevHeader,
                generalJournalDetails:
                    prevHeader.generalJournalDetails.length > 0
                        ? updatedDetails
                        : [selectedDetail], // Add new detail if the array is empty
            };
        });

        setSelectedDetail(EmptyGeneralJournalDetail());
        handleCloseEditDialog();
    };

    const handleSelectedDetailOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDetail((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSelectedDetailChartOfAccount = (event: SelectChangeEvent) => {
        const chartOfAccountId = event.target.value as string;
        const coaRecord = chartOfAccounts.find((coa) => coa.id === chartOfAccountId);
        setSelectedDetail((prevState) => ({
            ...prevState,
            chartOfAccount: coaRecord || EmptyChartOfAccount(),
            chartOfAccountId: chartOfAccountId,
        }));
    };

    const handleOpenDeleteSelectedDetailDialog = () => {
        setOpenDeleteSelectedDetailDialog(true);
    }

    const handleCloseDeleteSelectedDetailDialog = () => {
        setOpenDeleteSelectedDetailDialog(false);
        setSelectedDetail(EmptyGeneralJournalDetail());
    }

    const handleEditGeneralJournalDetail = (generalJournalDetailId: string) => {
        const selectedDetail = props.generalJournal.generalJournalDetails.find(d => d.generalJournalDetailId == generalJournalDetailId);
        if (selectedDetail !== undefined) {
            setSelectedDetail(selectedDetail)
            handleOpenEditDialog();
        } else {
            setSnackBar({ children: 'Data yang dipilih tidak ditemukan!', severity: 'error' });
        }
    }

    const handleDeleteGeneralJournalDetail = (generalJournalDetailId: string) => {
        const selectedDetail = props.generalJournal.generalJournalDetails.find(d => d.generalJournalDetailId == generalJournalDetailId);
        if (selectedDetail !== undefined) {
            setSelectedDetail(selectedDetail)
            handleOpenDeleteSelectedDetailDialog();
        } else {
            setSnackBar({ children: 'Data yang dipilih tidak ditemukan!', severity: 'error' });
        }
    }

    const handleConfirmDeleteSelectedDetail = () => {
        const updatedHeaderData = props.generalJournal.generalJournalDetails.filter((detail) => detail.generalJournalDetailId !== selectedDetail.generalJournalDetailId);

        props.setGeneralJournal((prevHeader) => ({
            ...prevHeader,
            generalJournalDetails: updatedHeaderData
        }));

        setSelectedDetail(EmptyGeneralJournalDetail());
        handleCloseDeleteSelectedDetailDialog();
    }

    // Custom cell renderer for edit and delete buttons
    const renderEditDeleteCell = (params: GridRenderCellParams) => {
        const { generalJournalDetailId } = params.row;

        return (
            <div>
                <Button
                    sx={{ mr: 1 }}
                    startIcon={<Edit />}
                    onClick={() => handleEditGeneralJournalDetail(generalJournalDetailId)}
                    color="primary"
                    disabled={!props.isEditMode}
                >
                    Ubah
                </Button>
                <Button
                    sx={{ ml: 1 }}
                    startIcon={<Delete />}
                    onClick={() => handleDeleteGeneralJournalDetail(generalJournalDetailId)}
                    color="secondary"
                    disabled={!props.isEditMode}
                >
                    Hapus
                </Button>
            </div>
        );
    };

    const columns: GridColDef<IGeneralJournalDetail>[] = [
        {
            field: "accountNo", headerName: "Kode Akun", width: 240, valueGetter: (params) => {
                let displayName = '';
                if (params.row && params.row.chartOfAccount) {
                    displayName = `${params.row.chartOfAccount.accountNo} - ${params.row.chartOfAccount.accountName}`
                }

                return displayName;
            }
        },
        {
            field: "debit", headerName: "Debit", width: 170,
            valueFormatter: (params: GridValueFormatterParams<number | string>) => {
                let value = 0;
                if (typeof params.value === 'string')
                    value = parseInt(params.value);
                else
                    value = params.value;

                return value.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
            },
            valueParser: (value: any) => {
                return parseInt(value);
            }
        },
        {
            field: "credit", headerName: "Credit", width: 170,
            valueFormatter: (params: GridValueFormatterParams<number | string>) => {
                let value = 0;
                if (typeof params.value === 'string')
                    value = parseInt(params.value);
                else
                    value = params.value;

                return value.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
            },
            valueParser: (value: any) => {
                return parseInt(value);
            }
        },
        {
            field: 'actions',
            headerName: 'Aksi',
            width: 350,
            renderCell: renderEditDeleteCell
        }
    ];

    return (
        <>
            {/* Form Stack */}
            <Stack
                component="form"
                onSubmit={props.handleSubmit}
                className="box-soft-shadow"
                p={3}
                borderRadius={3}
                spacing={2}
            >
                {props.isEditMode ? (
                    <>
                        <TextField
                            required
                            label="Nomor Transaksi"
                            size="small"
                            name='transactionNo'
                            value={props.generalJournal.transactionNo}
                            onChange={props.handleFieldChanges}
                            disabled={!props.isEditMode}
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={id}>
                            <DatePicker
                                label="Tanggal Transaksi"
                                slotProps={{
                                    textField: {
                                        helperText: 'DD-MM-YYYY',
                                    },
                                }}
                                value={new Date(props.generalJournal.transactionDate)}
                                onChange={props.handleDateFieldChanges}
                                disabled={!props.isEditMode}
                            />
                        </LocalizationProvider>

                        <TextField
                            label="Deskripsi"
                            name='description'
                            value={props.generalJournal.description}
                            onChange={props.handleFieldChanges}
                            disabled={!props.isEditMode}
                        />
                    </>
                ) : (
                    <>
                        {/* Display Information (Non-editable) */}
                        {!props.isEditMode && (
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={3}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Nomor Transaksi</Typography>
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <Typography variant="body1">{props.generalJournal.transactionNo}</Typography>
                                </Grid>

                                <Grid item xs={12} md={3}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Tanggal Transaksi</Typography>
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <Typography variant="body1">
                                        {format(new Date(props.generalJournal.transactionDate), 'dd-MM-yyyy')}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={3}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Deskripsi</Typography>
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <Typography variant="body1">{props.generalJournal.description}</Typography>
                                </Grid>
                            </Grid>
                        )}

                    </>
                )}

                {props.isEditMode ? (
                    <Box display={"flex"}>
                        <Box>
                            <Button type="submit" variant="contained" sx={{ marginRight: "1rem" }} disabled={props.buttonDisabled}>
                                Save
                            </Button>
                        </Box>
                        <Box>
                            <Button variant='outlined' color='warning' onClick={props.onClickCancel} disabled={props.buttonDisabled}>
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Box display={"flex"}>
                        <Button variant="contained" color="primary" sx={{ marginRight: "1rem" }} onClick={props.onClickEdit}>
                            Edit
                        </Button>
                        <Button variant="outlined" color="warning" onClick={handleOnClick}>
                            Delete
                        </Button>
                    </Box>
                )}
            </Stack>

            {/* DataGrid */}
            <Box className='box-soft-shadow' p={3} borderRadius={3} marginTop={3}>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    size='small'
                    color="primary"
                    onClick={handleOpenDialog}
                    disabled={!props.isEditMode}
                >
                    Tambah Detail
                </Button>
                <Box marginTop={4}>
                    <DataGrid
                        rows={props.generalJournal.generalJournalDetails}
                        columns={columns}
                        getRowId={(row) => row?.generalJournalDetailId}
                        editMode='row'
                        autoHeight
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
                        rowSelection={false}
                    />
                </Box>

                {/* Create Detail Dialog */}
                <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="md">
                    <DialogTitle>Tambah Detail</DialogTitle>
                    <DialogContent>
                        <Stack
                            id={'detail-form'}
                            component="form"
                            onSubmit={handleAddRow}
                            className="box-soft-shadow"
                            p={3}
                            borderRadius={3}
                            spacing={2}
                        >
                            <FormControl size='small' sx={{ m: 1, minWidth: 120 }} required autoFocus={props.autoFocus} disabled={!props.isEditMode}>
                                <InputLabel id='chart-of-account-selection-label'>Kode Akun</InputLabel>
                                <Select
                                    required
                                    labelId="chart-of-account-selection-label"
                                    label="Kode Akun"
                                    size="small"
                                    name='chartOfAccountId'
                                    value={newDetail.chartOfAccountId}
                                    onChange={handleSelectChartOfAccount}
                                >
                                    {chartOfAccounts.map((value) => (
                                        <MenuItem key={value.id} value={value.id}>
                                            {value.accountNo} - {value.accountName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1 }}>
                                <InputLabel required htmlFor="debit-adornment-amount">Debit</InputLabel>
                                <OutlinedInput
                                    name='debit'
                                    id="debit-adornment-amount"
                                    startAdornment={<InputAdornment position="start">Rp</InputAdornment>}
                                    label="Debit"
                                    required
                                    type={'number'}
                                    value={newDetail.debit}
                                    onChange={handleNewDetailOnChange}
                                    disabled={!props.isEditMode}
                                />
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1 }}>
                                <InputLabel required htmlFor="credit-adornment-amount">Credit</InputLabel>
                                <OutlinedInput
                                    name='credit'
                                    id="credit-adornment-amount"
                                    startAdornment={<InputAdornment position="start">Rp</InputAdornment>}
                                    label="Credit"
                                    required
                                    type={'number'}
                                    value={newDetail.credit}
                                    onChange={handleNewDetailOnChange}
                                    disabled={!props.isEditMode}
                                />
                            </FormControl>

                        </Stack>
                    </DialogContent>

                    <DialogActions>
                        <Button type='submit' variant='contained' form={'detail-form'} color='primary'>
                            Tambah
                        </Button>
                        <Button variant='outlined' onClick={handleCloseDialog}>
                            Batal
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Edit Detail Dialog */}
                <Dialog open={openEdit} onClose={handleCloseEditDialog} fullWidth maxWidth="md">
                    <DialogTitle>Edit Detail</DialogTitle>
                    <DialogContent>
                        <Stack
                            id={'detail-form'}
                            component="form"
                            onSubmit={handleEditRow}
                            className="box-soft-shadow"
                            p={3}
                            borderRadius={3}
                            spacing={2}
                        >
                            <FormControl size='small' sx={{ m: 1, minWidth: 120 }} required autoFocus={props.autoFocus} disabled={!props.isEditMode}>
                                <InputLabel id='chart-of-account-edit-selection-label'>Kode Akun</InputLabel>
                                <Select
                                    required
                                    labelId="chart-of-account-edit-selection-label"
                                    label="Kode Akun"
                                    size="small"
                                    name='chartOfAccountId'
                                    value={selectedDetail.chartOfAccountId}
                                    onChange={handleSelectedDetailChartOfAccount}
                                >
                                    {chartOfAccounts.map((value) => (
                                        <MenuItem key={value.id} value={value.id}>
                                            {value.accountNo} - {value.accountName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1 }}>
                                <InputLabel required htmlFor="edit-debit-adornment-amount">Debit</InputLabel>
                                <OutlinedInput
                                    name='debit'
                                    id="edit-debit-adornment-amount"
                                    startAdornment={<InputAdornment position="start">Rp</InputAdornment>}
                                    label="Debit"
                                    required
                                    type={'number'}
                                    value={selectedDetail.debit}
                                    onChange={handleSelectedDetailOnChange}
                                    disabled={!props.isEditMode}
                                />
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1 }}>
                                <InputLabel required htmlFor="edit-credit-adornment-amount">Credit</InputLabel>
                                <OutlinedInput
                                    name='credit'
                                    id="edit-credit-adornment-amount"
                                    startAdornment={<InputAdornment position="start">Rp</InputAdornment>}
                                    label="Credit"
                                    required
                                    type={'number'}
                                    value={selectedDetail.credit}
                                    onChange={handleSelectedDetailOnChange}
                                    disabled={!props.isEditMode}
                                />
                            </FormControl>

                        </Stack>
                    </DialogContent>

                    <DialogActions>
                        <Button type='submit' variant='contained' form={'detail-form'} color='primary'>
                            Simpan
                        </Button>
                        <Button variant='outlined' onClick={handleCloseEditDialog}>
                            Batal
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>

            {/* Delete Confirmation Dialog */}
            <AlertDialogSlide
                open={openDeleteDialog}
                onClose={handleCancelDeleteDialog}
                onConfirm={handleConfirmDelete}
                title="Hapus data pelanggan secara permanen?"
                description='Anda yakin ingin menghapus data jurnal umum?
            Tindakan ini tidak dapat dibatalkan dan akan menghapus semua informasi terkait jurnal umum.
            Pastikan Anda telah mempertimbangkan dengan cermat sebelum melanjutkan.'
            />

            {/* Delete Detail Confirmation Dialog */}
            <AlertDialogSlide
                open={openDeleteSelectedDetailDialog}
                onClose={handleCloseDeleteSelectedDetailDialog}
                onConfirm={handleConfirmDeleteSelectedDetail}
                title="Hapus detail jurnal umum yang dipilih secara permanen?"
                description='Anda yakin ingin menghapus data detail jurnal umum yang dipilih?
            Pastikan Anda telah mempertimbangkan dengan cermat sebelum melanjutkan.'
            />
        </>
    );
};

export default InsertGeneralJournalForm;
