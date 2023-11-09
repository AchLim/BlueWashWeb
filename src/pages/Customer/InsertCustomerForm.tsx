import { useState } from 'react';
import { Box, Button, Stack, TextField } from "@mui/material";
import ICustomer from "../../components/models/ICustomer";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { DELETE_CUSTOMER_URL } from '../../axios';
import useSnackBar from '../../hooks/useSnackBar';
import { useNavigate } from 'react-router-dom';
import AlertDialogSlide from '../../components/AlertDialogSlide';


interface InsertCustomerFormProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleFieldChanges: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClickEdit?: () => void;
    onClickCancel: () => void;

    customer: ICustomer;

    isEditMode: boolean;
    autoFocus?: boolean;

    buttonDisabled?: boolean;
}

const InsertCustomerForm = (props: InsertCustomerFormProps) => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const axiosPrivate = useAxiosPrivate();
    const { setSnackBar } = useSnackBar();
    const navigate = useNavigate();

    const handleOnClick = () => {
        if (!props.customer.id.trim()) {
            return;
        }

        setOpenDeleteDialog(true);
    }

    const handleConfirmDelete = async () => {
        const response = await axiosPrivate.delete(DELETE_CUSTOMER_URL(props.customer.id));
        const data = response.data;

        if (data.error)
            setSnackBar({ children: data.error, severity: 'error' });
        else {
            navigate('/master-data/customer-tree');
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

            <TextField required label="Nama Pelanggan" size="small" autoFocus={props.autoFocus}
                name='customerName' value={props.customer.customerName} onChange={props.handleFieldChanges} disabled={!props.isEditMode} />

            <TextField required label="Kode Pelanggan" size="small"
                name='customerCode' value={props.customer.customerCode} onChange={props.handleFieldChanges} disabled={!props.isEditMode} />

            <TextField label="Alamat Pelanggan"
                name='customerAddress' value={props.customer.customerAddress || ''} onChange={props.handleFieldChanges} disabled={!props.isEditMode} />

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
            description='Anda yakin ingin menghapus data pelanggan?
            Tindakan ini tidak dapat dibatalkan dan akan menghapus semua informasi terkait pelanggan,
            termasuk riwayat transaksi dan detail kontak.
            Pastikan Anda telah mempertimbangkan dengan cermat sebelum melanjutkan.'
        />

    </>
}

export default InsertCustomerForm;