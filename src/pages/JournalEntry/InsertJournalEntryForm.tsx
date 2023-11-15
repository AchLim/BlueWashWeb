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
import { DataGrid, GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';
import { Add, Delete, Edit } from '@mui/icons-material';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useSnackBar from '../../hooks/useSnackBar';
import { useNavigate } from 'react-router-dom';
import AlertDialogSlide from '../../components/AlertDialogSlide';
import { DELETE_JOURNAL_ENTRY_URL, GET_CHART_OF_ACCOUNTS_URL } from '../../axios';
import IJournalEntry, { EmptyJournalItem, IJournalItem } from '../../models/IJournalEntry';
import IChartOfAccount, { EmptyChartOfAccount } from '../../models/IChartOfAccount';
import { v4 as uuidv4 } from 'uuid';
import id from 'date-fns/locale/id';
import { format } from 'date-fns';
import { ConvertNumberToCurrency } from '../../utils/Converter';

interface InsertJournalEntryFormProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleDateFieldChanges: (value: Date | null) => void;
    handleFieldChanges: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClickEdit?: () => void;
    onClickCancel: () => void;
    journalEntry: IJournalEntry;
    setJournalEntry: React.Dispatch<React.SetStateAction<IJournalEntry>>;
    isEditMode: boolean;
    autoFocus?: boolean;
    buttonDisabled?: boolean;
}

const InsertJournalEntryForm = (props: InsertJournalEntryFormProps) => {
    // Hooks
    const axiosPrivate = useAxiosPrivate();
    const { setSnackBar } = useSnackBar();
    const navigate = useNavigate();

    // New-detail related
    const [open, setOpen] = useState<boolean>(false)
    const [newItem, setNewItem] = useState<IJournalItem>(EmptyJournalItem);

    // Edit-selected related
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<IJournalItem>(EmptyJournalItem);

    // Delete Item
    const [openDeleteSelectedItemDialog, setOpenDeleteSelectedItemDialog] = useState<boolean>(false);

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
        if (!props.journalEntry.id.trim()) {
            return;
        }
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        const response = await axiosPrivate.delete(DELETE_JOURNAL_ENTRY_URL(props.journalEntry.id));
        const data = response.data;

        if (data.error) {
            setSnackBar({ children: data.error, severity: 'error' });
        } else {
            navigate('/journal-entry-tree');
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

        const newItemWithId = {
            ...newItem,
            journalItemId: uuidv4(),
        };

        props.setJournalEntry((prevHeader) => {
            if (newItem && newItem.chartOfAccountId) {
                return {
                    ...prevHeader,
                    journalItems: prevHeader.journalItems.length > 0
                        ? [...prevHeader.journalItems, ...[newItemWithId]]
                        : [newItemWithId],
                };
            }

            return prevHeader;
        });

        setNewItem(EmptyJournalItem());
        handleCloseDialog();
    };

    const handleNewItemOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewItem((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSelectChartOfAccount = (event: SelectChangeEvent) => {
        const chartOfAccountId = event.target.value as string;
        const coaRecord = chartOfAccounts.find((coa) => coa.id === chartOfAccountId);
        setNewItem((prevState) => ({
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
        setSelectedItem(EmptyJournalItem());
    }

    const handleEditRow = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        props.setJournalEntry((prevHeader) => {
            const updatedDetails = prevHeader.journalItems.map((detail) =>
                detail.journalItemId === selectedItem.journalItemId
                    ? selectedItem // Replace existing detail
                    : detail
            );

            return {
                ...prevHeader,
                journalItems:
                    prevHeader.journalItems.length > 0
                        ? updatedDetails
                        : [selectedItem], // Add new detail if the array is empty
            };
        });

        setSelectedItem(EmptyJournalItem());
        handleCloseEditDialog();
    };

    const handleSelectedItemOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedItem((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSelectedItemChartOfAccount = (event: SelectChangeEvent) => {
        const chartOfAccountId = event.target.value as string;
        const coaRecord = chartOfAccounts.find((coa) => coa.id === chartOfAccountId);
        setSelectedItem((prevState) => ({
            ...prevState,
            chartOfAccount: coaRecord || EmptyChartOfAccount(),
            chartOfAccountId: chartOfAccountId,
        }));
    };

    const handleOpenDeleteSelectedItemDialog = () => {
        setOpenDeleteSelectedItemDialog(true);
    }

    const handleCloseDeleteSelectedItemDialog = () => {
        setOpenDeleteSelectedItemDialog(false);
        setSelectedItem(EmptyJournalItem());
    }

    const handleEditJournalEntryDetail = (journalItemId: string) => {
        const selectedItem = props.journalEntry.journalItems.find(d => d.journalItemId == journalItemId);
        if (selectedItem !== undefined) {
            setSelectedItem(selectedItem)
            handleOpenEditDialog();
        } else {
            setSnackBar({ children: 'Data yang dipilih tidak ditemukan!', severity: 'error' });
        }
    }

    const handleDeleteJournalEntryDetail = (journalItemId: string) => {
        const selectedItem = props.journalEntry.journalItems.find(d => d.journalItemId == journalItemId);
        if (selectedItem !== undefined) {
            setSelectedItem(selectedItem)
            handleOpenDeleteSelectedItemDialog();
        } else {
            setSnackBar({ children: 'Data yang dipilih tidak ditemukan!', severity: 'error' });
        }
    }

    const handleConfirmDeleteSelectedItem = () => {
        const updatedHeaderData = props.journalEntry.journalItems.filter((detail) => detail.journalItemId !== selectedItem.journalItemId);

        props.setJournalEntry((prevHeader) => ({
            ...prevHeader,
            journalItems: updatedHeaderData
        }));

        setSelectedItem(EmptyJournalItem());
        handleCloseDeleteSelectedItemDialog();
    }

    // Custom cell renderer for edit and delete buttons
    const renderEditDeleteCell = (params: GridRenderCellParams) => {
        const { journalItemId } = params.row;

        return (
            <div>
                <Button
                    sx={{ mr: 1 }}
                    startIcon={<Edit />}
                    onClick={() => handleEditJournalEntryDetail(journalItemId)}
                    color="primary"
                    disabled={!props.isEditMode}
                >
                    Ubah
                </Button>
                <Button
                    sx={{ ml: 1 }}
                    startIcon={<Delete />}
                    onClick={() => handleDeleteJournalEntryDetail(journalItemId)}
                    color="secondary"
                    disabled={!props.isEditMode}
                >
                    Hapus
                </Button>
            </div>
        );
    };

    const columns: GridColDef<IJournalItem>[] = [
        {
            field: "accountNo", headerName: "Kode Akun", width: 240, valueGetter: (params) => {
                let displayName = '';
                if (params.row && params.row.chartOfAccount && params.row.chartOfAccount.accountNo) {
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
                    value = parseFloat(params.value);
                else
                    value = params.value;

                return ConvertNumberToCurrency(value);
            }
        },
        {
            field: "credit", headerName: "Credit", width: 170,
            valueFormatter: (params: GridValueFormatterParams<number | string>) => {
                let value = 0;
                if (typeof params.value === 'string')
                    value = parseFloat(params.value);
                else
                    value = params.value;


                return ConvertNumberToCurrency(value);
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
                            value={props.journalEntry.transactionNo}
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
                                value={new Date(props.journalEntry.transactionDate)}
                                onChange={props.handleDateFieldChanges}
                                disabled={!props.isEditMode}
                            />
                        </LocalizationProvider>

                        <TextField
                            label="Deskripsi"
                            name='description'
                            value={props.journalEntry.description}
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
                                    <Typography variant="body1">{props.journalEntry.transactionNo}</Typography>
                                </Grid>

                                <Grid item xs={12} md={3}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Tanggal Transaksi</Typography>
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <Typography variant="body1">
                                        {format(new Date(props.journalEntry.transactionDate), 'dd-MM-yyyy')}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={3}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Deskripsi</Typography>
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <Typography variant="body1">{props.journalEntry.description}</Typography>
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
                        rows={props.journalEntry.journalItems}
                        columns={columns}
                        getRowId={(row) => row?.journalItemId}
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
                                    value={newItem.chartOfAccountId}
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
                                    value={newItem.debit}
                                    onChange={handleNewItemOnChange}
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
                                    value={newItem.credit}
                                    onChange={handleNewItemOnChange}
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
                                    value={selectedItem.chartOfAccountId}
                                    onChange={handleSelectedItemChartOfAccount}
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
                                    value={selectedItem.debit}
                                    onChange={handleSelectedItemOnChange}
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
                                    value={selectedItem.credit}
                                    onChange={handleSelectedItemOnChange}
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
                open={openDeleteSelectedItemDialog}
                onClose={handleCloseDeleteSelectedItemDialog}
                onConfirm={handleConfirmDeleteSelectedItem}
                title="Hapus detail jurnal umum yang dipilih secara permanen?"
                description='Anda yakin ingin menghapus data detail jurnal umum yang dipilih?
            Pastikan Anda telah mempertimbangkan dengan cermat sebelum melanjutkan.'
            />
        </>
    );
};

export default InsertJournalEntryForm;
