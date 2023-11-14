import { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { DELETE_CHART_OF_ACCOUNT_URL } from '../../axios';
import useSnackBar from '../../hooks/useSnackBar';
import { useNavigate } from 'react-router-dom';
import AlertDialogSlide from '../../components/AlertDialogSlide';
import IChartOfAccount from '../../models/IChartOfAccount';


interface InsertChartOfAccountFormProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleFieldChanges: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectAccountHeader: (event: SelectChangeEvent) => void;
    onClickEdit?: () => void;
    onClickCancel: () => void;

    chartOfAccount: IChartOfAccount;

    isEditMode: boolean;
    autoFocus?: boolean;

    buttonDisabled?: boolean;
}

const InsertChartOfAccountForm = (props: InsertChartOfAccountFormProps) => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const axiosPrivate = useAxiosPrivate();
    const { setSnackBar } = useSnackBar();
    const navigate = useNavigate();

    const handleOnClick = () => {
        if (!props.chartOfAccount.id.trim()) {
            return;
        }

        setOpenDeleteDialog(true);
    }

    const handleConfirmDelete = async () => {
        const response = await axiosPrivate.delete(DELETE_CHART_OF_ACCOUNT_URL(props.chartOfAccount.id));
        const data = response.data;

        if (data.error)
            setSnackBar({ children: data.error, severity: 'error' });
        else {
            navigate('/master-data/chart-of-account-tree');
            setSnackBar({ children: 'Data berhasil dihapus.', severity: 'success' });
        }

        setOpenDeleteDialog(false);
    }

    const handleCancelDeleteDialog = () => {
        setOpenDeleteDialog(false);
    }

    return <>
        <Stack
            component="form"
            onSubmit={props.handleSubmit}
            className="box-soft-shadow"
            p={3}
            borderRadius={3}
            spacing={2}
        >
            <FormControl sx={{ m: 1, minWidth: 120 }} required autoFocus={props.autoFocus} disabled={!props.isEditMode}>
                <InputLabel id='account-header-no-selection-label'>Nama Akun Header</InputLabel>
                <Select required labelId="account-header-no-selection-label" label="Nama Akun Header" size="small"
                    name='accountHeaderNo' value={props.chartOfAccount.accountHeaderNo.toString()} onChange={props.handleSelectAccountHeader}>
                    <MenuItem value={0}><em>-</em></MenuItem>
                    <MenuItem value={100}>Asset</MenuItem>
                    <MenuItem value={200}>Liabilitas</MenuItem>
                    <MenuItem value={300}>Ekuitas</MenuItem>
                    <MenuItem value={400}>Pendapatan</MenuItem>
                    <MenuItem value={500}>Harga Pokok Penjualan</MenuItem>
                    <MenuItem value={600}>Pengeluaran</MenuItem>
                </Select>
            </FormControl>

            <TextField required label="Kode Akun Header" size="small"
                name='accountHeaderNo' value={props.chartOfAccount.accountHeaderNo} disabled />


            <TextField required label="Nama Akun Detail" size="small"
                name='accountName' value={props.chartOfAccount.accountName} onChange={props.handleFieldChanges} disabled={!props.isEditMode} />


            <TextField required label="Kode Akun Detail" size="small"
                name='accountNo' value={props.chartOfAccount.accountNo} onChange={props.handleFieldChanges} disabled={!props.isEditMode} />

            {
                props.isEditMode ?
                    (
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
                    )
            }
        </Stack>

        <AlertDialogSlide
            open={openDeleteDialog}
            onClose={handleCancelDeleteDialog}
            onConfirm={handleConfirmDelete}
            title="Hapus data pelanggan secara permanen?"
            description='Anda yakin ingin menghapus data kode akun?
            Tindakan ini tidak dapat dibatalkan dan akan menghapus semua informasi terkait kode akun,
            termasuk riwayat transaksi dan jurnal.
            Pastikan Anda telah mempertimbangkan dengan cermat sebelum melanjutkan.'
        />

    </>
}

export default InsertChartOfAccountForm;