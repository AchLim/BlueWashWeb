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
import { DataGrid, GridColDef, GridRenderCellParams, GridValueFormatterParams, GridValueGetterParams } from '@mui/x-data-grid';
import { Add, Delete, Edit } from '@mui/icons-material';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useSnackBar from '../../hooks/useSnackBar';
import { useNavigate } from 'react-router-dom';
import AlertDialogSlide from '../../components/AlertDialogSlide';
import { v4 as uuidv4 } from 'uuid';
import id from 'date-fns/locale/id';
import { ConvertDateToLocaleDate, ConvertNumberToCurrency } from '../../utils/Converter';
import IPurchaseHeader, { EmptyPurchaseDetail, IPurchaseDetail } from '../../models/IPurchase';
import IInventory, { EmptyInventory } from '../../models/IInventory';
import { DELETE_PURCHASE_HEADER_URL, GET_INVENTORIES_URL, GET_SUPPLIERS_URL, INSERT_SUPPLIER_URL } from '../../axios';
import SupplierCreatableAutocompleteField from '../../components/SupplierCreatableAutocompleteField';
import ISupplier, { EmptySupplier } from '../../models/ISupplier';
import InsertSupplierForm from '../Supplier/InsertSupplierForm';
import CreatableModelDialog from '../../components/CreatableModelDialog';

interface InsertPurchaseHeaderFormProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleDateFieldChanges: (value: Date | null) => void;
    handleFieldChanges: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClickEdit?: () => void;
    onClickCancel: () => void;
    purchaseHeader: IPurchaseHeader;
    setPurchaseHeader: React.Dispatch<React.SetStateAction<IPurchaseHeader>>;
    isEditMode: boolean;
    autoFocus?: boolean;
    buttonDisabled?: boolean;
}

const InsertPurchaseHeaderForm = (props: InsertPurchaseHeaderFormProps) => {
    // Hooks
    const axiosPrivate = useAxiosPrivate();
    const { setSnackBar } = useSnackBar();
    const navigate = useNavigate();

    // New-detail related
    const [open, setOpen] = useState<boolean>(false)
    const [newItem, setNewItem] = useState<IPurchaseDetail>(EmptyPurchaseDetail);

    // Edit-selected related
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<IPurchaseDetail>(EmptyPurchaseDetail);

    // Suppliers
    const [suppliers, setSuppliers] = useState<Array<ISupplier>>([]);

    // Inventories
    const [inventories, setInventories] = useState<Array<IInventory>>([]);

    // Delete Item
    const [openDeleteSelectedItemDialog, setOpenDeleteSelectedItemDialog] = useState<boolean>(false);

    // Delete Header
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

    // Creatable Supplier related
    const [newSupplier, setNewSupplier] = useState<ISupplier>(EmptySupplier);
    const [openCreatableDialog, setOpenCreatableDialog] = useState<boolean>(false);

    const HandleCloseSupplierForm = () => {
        setNewSupplier(EmptySupplier);
        setOpenCreatableDialog(false);
    }

    useEffect(() => {
        const getInventories = async () => {
            const response = await axiosPrivate.get(GET_INVENTORIES_URL());
            const data = response.data;
            if (!data.error) {
                setInventories(data);
            }
        };

        getInventories();

    }, []);

    useEffect(() => {
        const getSuppliers = async () => {
            const response = await axiosPrivate.get(GET_SUPPLIERS_URL());
            const data = response.data;
            if (!data.error) {
                setSuppliers(data);
            }
        }

        getSuppliers();
    }, [newSupplier])

    const handleOnClick = () => {
        if (!props.purchaseHeader.id.trim()) {
            return;
        }
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        const response = await axiosPrivate.delete(DELETE_PURCHASE_HEADER_URL(props.purchaseHeader.id));
        const data = response.data;

        if (data.error) {
            setSnackBar({ children: data.error, severity: 'error' });
        } else {
            navigate('/purchase-tree-tree');
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
            purchaseDetailId: uuidv4(),
        };

        props.setPurchaseHeader((prevHeader) => {
            if (newItem && newItem.inventoryId) {
                return {
                    ...prevHeader,
                    purchaseDetails: prevHeader.purchaseDetails.length > 0
                        ? [...prevHeader.purchaseDetails, ...[newItemWithId]]
                        : [newItemWithId],
                };
            }

            return prevHeader;
        });

        setNewItem(EmptyPurchaseDetail());
        handleCloseDialog();
    };

    const handleNewItemOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewItem((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSelectInventory = (event: SelectChangeEvent) => {
        const inventoryId = event.target.value as string;
        const inventoryRecord = inventories.find((inventory) => inventory.id === inventoryId);
        setNewItem((prevState) => ({
            ...prevState,
            inventory: inventoryRecord || EmptyInventory(),
            inventoryId: inventoryId,
        }));
    };

    const handleOpenEditDialog = () => {
        setOpenEdit(true);
    }

    const handleCloseEditDialog = () => {
        setOpenEdit(false);
        setSelectedItem(EmptyPurchaseDetail());
    }

    const handleEditRow = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        props.setPurchaseHeader((prevHeader) => {
            const updatedDetails = prevHeader.purchaseDetails.map((detail) =>
                detail.purchaseDetailId === selectedItem.purchaseDetailId
                    ? selectedItem // Replace existing detail
                    : detail
            );

            return {
                ...prevHeader,
                purchaseDetails:
                    prevHeader.purchaseDetails.length > 0
                        ? updatedDetails
                        : [selectedItem], // Add new detail if the array is empty
            };
        });

        setSelectedItem(EmptyPurchaseDetail());
        handleCloseEditDialog();
    };

    const handleSelectedItemOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedItem((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSelectedItemInventory = (event: SelectChangeEvent) => {
        const inventoryId = event.target.value as string;
        const inventoryRecord = inventories.find((inventory) => inventory.id === inventoryId);
        setSelectedItem((prevState) => ({
            ...prevState,
            inventory: inventoryRecord || EmptyInventory(),
            inventoryId: inventoryId,
        }));
    };

    const handleOpenDeleteSelectedItemDialog = () => {
        setOpenDeleteSelectedItemDialog(true);
    }

    const handleCloseDeleteSelectedItemDialog = () => {
        setOpenDeleteSelectedItemDialog(false);
        setSelectedItem(EmptyPurchaseDetail());
    }

    const handleEditPurchaseHeaderDetail = (purchaseDetailId: string) => {
        const selectedItem = props.purchaseHeader.purchaseDetails.find(d => d.purchaseDetailId == purchaseDetailId);
        if (selectedItem !== undefined) {
            setSelectedItem(selectedItem)
            handleOpenEditDialog();
        } else {
            setSnackBar({ children: 'Data yang dipilih tidak ditemukan!', severity: 'error' });
        }
    }

    const handleDeletePurchaseHeaderDetail = (purchaseDetailId: string) => {
        const selectedItem = props.purchaseHeader.purchaseDetails.find(d => d.purchaseDetailId == purchaseDetailId);
        if (selectedItem !== undefined) {
            setSelectedItem(selectedItem)
            handleOpenDeleteSelectedItemDialog();
        } else {
            setSnackBar({ children: 'Data yang dipilih tidak ditemukan!', severity: 'error' });
        }
    }

    const handleConfirmDeleteSelectedItem = () => {
        const updatedHeaderData = props.purchaseHeader.purchaseDetails.filter((detail) => detail.purchaseDetailId !== selectedItem.purchaseDetailId);

        props.setPurchaseHeader((prevHeader) => ({
            ...prevHeader,
            purchaseDetails: updatedHeaderData
        }));

        setSelectedItem(EmptyPurchaseDetail());
        handleCloseDeleteSelectedItemDialog();
    }

    // Custom cell renderer for edit and delete buttons
    const renderEditDeleteCell = (params: GridRenderCellParams) => {
        const { purchaseDetailId } = params.row;

        return (
            <div>
                <Button
                    sx={{ mr: 1 }}
                    startIcon={<Edit />}
                    onClick={() => handleEditPurchaseHeaderDetail(purchaseDetailId)}
                    color="primary"
                    disabled={!props.isEditMode}
                >
                    Ubah
                </Button>
                <Button
                    sx={{ ml: 1 }}
                    startIcon={<Delete />}
                    onClick={() => handleDeletePurchaseHeaderDetail(purchaseDetailId)}
                    color="secondary"
                    disabled={!props.isEditMode}
                >
                    Hapus
                </Button>
            </div>
        );
    };

    const columns: GridColDef<IPurchaseDetail>[] = [
        {
            field: "itemName", headerName: "Nama Persediaan", width: 240, valueGetter: (params) => {
                let displayName = '';
                if (params.row && params.row.inventory && params.row.inventory.itemName) {
                    displayName = `${params.row.inventory.itemName}`
                }

                return displayName;
            }
        },
        {
            field: "quantity", headerName: "Quantity", width: 170
        },
        {
            field: "price", headerName: "Price", width: 170,
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
            field: "subtotal", headerName: "Subtotal", width: 170,
            valueGetter: (params: GridValueGetterParams<IPurchaseDetail>) => {
                const value = params.row.quantity * params.row.price;
                return value;
            },
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
                            label="Nomor Pembelian"
                            size="small"
                            name='purchaseNo'
                            value={props.purchaseHeader.purchaseNo}
                            onChange={props.handleFieldChanges}
                            disabled={!props.isEditMode}
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={id}>
                            <DatePicker
                                label="Tanggal Pembelian"
                                slotProps={{
                                    textField: {
                                        helperText: 'DD-MM-YYYY',
                                    },
                                }}
                                value={new Date(props.purchaseHeader.purchaseDate)}
                                onChange={props.handleDateFieldChanges}
                                disabled={!props.isEditMode}
                            />
                        </LocalizationProvider>

                        <SupplierCreatableAutocompleteField
                            fieldId="supplierId"
                            fieldLabel="Pemasok"
                            optionList={suppliers}
                            supplierValue={props.purchaseHeader.supplier}
                            setSupplierValue={(supplier) => {
                                props.setPurchaseHeader(prevHeader => ({
                                    ...prevHeader,
                                    supplier: supplier,
                                    supplierId: supplier.id,
                                }))
                            }}
                            setNewSupplier={setNewSupplier}
                            setOpenDialog={setOpenCreatableDialog}
                        />

                        <TextField
                            label="Deskripsi"
                            name='description'
                            value={props.purchaseHeader.description}
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
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Nomor Pembelian</Typography>
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <Typography variant="body1">{props.purchaseHeader.purchaseNo}</Typography>
                                </Grid>

                                <Grid item xs={12} md={3}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Tanggal Pembelian</Typography>
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <Typography variant="body1">
                                        {ConvertDateToLocaleDate(props.purchaseHeader.purchaseDate)}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={3}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Pemasok</Typography>
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <Typography variant="body1">
                                        {props.purchaseHeader.supplier.supplierName}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={3}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Deskripsi</Typography>
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <Typography variant="body1">{props.purchaseHeader.description}</Typography>
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
                        rows={props.purchaseHeader.purchaseDetails}
                        columns={columns}
                        getRowId={(row) => row?.purchaseDetailId}
                        editMode='row'
                        rowSelection={false}
                        autoHeight
                        sx={{
                            '.MuiDataGrid-cell:focus': {
                                outline: 'none'
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
                                <InputLabel id='inventory-selection-label'>Nama Persediaan</InputLabel>
                                <Select
                                    required
                                    labelId="inventory-selection-label"
                                    label="Nama Persediaan"
                                    size="small"
                                    name='inventoryId'
                                    value={newItem.inventoryId}
                                    onChange={handleSelectInventory}
                                >
                                    {inventories.map((value) => (
                                        <MenuItem key={value.id} value={value.id}>
                                            {value.itemName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                name='quantity'
                                label="Kuantitas"
                                required
                                type={'number'}
                                value={newItem.quantity}
                                onChange={handleNewItemOnChange}
                                disabled={!props.isEditMode}
                            />

                            <FormControl fullWidth sx={{ m: 1 }}>
                                <InputLabel required htmlFor="price-adornment-amount">Harga</InputLabel>
                                <OutlinedInput
                                    name='price'
                                    id="price-adornment-amount"
                                    startAdornment={<InputAdornment position="start">Rp</InputAdornment>}
                                    label="Harga"
                                    required
                                    type={'number'}
                                    value={newItem.price}
                                    onChange={handleNewItemOnChange}
                                    disabled={!props.isEditMode}
                                />
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1 }}>
                                <InputLabel htmlFor="subtotal-adornment-amount">Subtotal</InputLabel>
                                <OutlinedInput
                                    name='subtotal'
                                    id="subtotal-adornment-amount"
                                    startAdornment={<InputAdornment position="start">Rp</InputAdornment>}
                                    label="Subtotal"
                                    type={'number'}
                                    value={newItem.price * newItem.quantity}
                                    disabled
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
                                <InputLabel id='inventory-edit-selection-label'>Nama Persediaan</InputLabel>
                                <Select
                                    required
                                    labelId="inventory-edit-selection-label"
                                    label="Nama Persediaan"
                                    size="small"
                                    name='inventoryId'
                                    value={selectedItem.inventoryId}
                                    onChange={handleSelectedItemInventory}
                                >
                                    {inventories.map((value) => (
                                        <MenuItem key={value.id} value={value.id}>
                                            {value.itemName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                name='quantity'
                                label="Quantity"
                                required
                                type={'number'}
                                value={selectedItem.quantity}
                                onChange={handleSelectedItemOnChange}
                                disabled={!props.isEditMode}
                            />

                            <FormControl fullWidth sx={{ m: 1 }}>
                                <InputLabel required htmlFor="edit-price-adornment-amount">Price</InputLabel>
                                <OutlinedInput
                                    name='price'
                                    id="edit-price-adornment-amount"
                                    startAdornment={<InputAdornment position="start">Rp</InputAdornment>}
                                    label="Price"
                                    required
                                    type={'number'}
                                    value={selectedItem.price}
                                    onChange={handleSelectedItemOnChange}
                                    disabled={!props.isEditMode}
                                />
                            </FormControl>

                            <FormControl fullWidth sx={{ m: 1 }}>
                                <InputLabel htmlFor="subtotal-edit-adornment-amount">Subtotal</InputLabel>
                                <OutlinedInput
                                    name='subtotal'
                                    id="subtotal-edit-adornment-amount"
                                    startAdornment={<InputAdornment position="start">Rp</InputAdornment>}
                                    label="Subtotal"
                                    type={'number'}
                                    value={selectedItem.price * selectedItem.quantity}
                                    disabled
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
                title="Hapus data pemasok secara permanen?"
                description='Anda yakin ingin menghapus data pembelian?
            Tindakan ini tidak dapat dibatalkan dan akan menghapus semua informasi terkait pembelian.
            Pastikan Anda telah mempertimbangkan dengan cermat sebelum melanjutkan.'
            />

            {/* Delete Detail Confirmation Dialog */}
            <AlertDialogSlide
                open={openDeleteSelectedItemDialog}
                onClose={handleCloseDeleteSelectedItemDialog}
                onConfirm={handleConfirmDeleteSelectedItem}
                title="Hapus detail pembelian yang dipilih secara permanen?"
                description='Anda yakin ingin menghapus data detail pembelian yang dipilih?
            Pastikan Anda telah mempertimbangkan dengan cermat sebelum melanjutkan.'
            />

            {/* Supplier Creatable Dialog */}
            <CreatableModelDialog
                title='Tambah data pemasok baru'
                fullWidth
                maxWidth='md'
                open={openCreatableDialog}
                content={<InsertSupplierForm
                    autoFocus
                    supplier={newSupplier}
                    handleFieldChanges={(event) => {
                        setNewSupplier({
                            ...newSupplier,
                            [event.target.name]: event.target.value,
                        })
                    }}
                    isEditMode={true}
                    onClickCancel={HandleCloseSupplierForm}
                    handleSubmit={async (event) => {
                        event.preventDefault();

                        const response = await axiosPrivate.post(INSERT_SUPPLIER_URL(), newSupplier);
                        const data: ISupplier & { 'error': string } = response.data;

                        if (data.error) {
                            setSnackBar({ children: data.error, severity: 'error' });
                        } else {
                            HandleCloseSupplierForm();
                            props.setPurchaseHeader(prevHeader => ({
                                ...prevHeader,
                                supplier: data,
                                supplierId: data.id
                            }))
                            setSnackBar({ children: `Data pemasok dengan nama ${data.supplierName} berhasil dibuat.`, severity: "success" })
                        }
                    }}
                />}
            />
        </>
    );
};

export default InsertPurchaseHeaderForm;
