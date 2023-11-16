import { useState } from 'react';
import { Box, Button, Stack, TextField } from "@mui/material";
import IInventory from "../../models/IInventory";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { DELETE_INVENTORY_URL } from '../../axios';
import useSnackBar from '../../hooks/useSnackBar';
import { useNavigate } from 'react-router-dom';
import AlertDialogSlide from '../../components/AlertDialogSlide';


interface InsertInventoryFormProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleFieldChanges: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClickEdit?: () => void;
    onClickCancel: () => void;

    inventory: IInventory;

    isEditMode: boolean;
    autoFocus?: boolean;

    buttonDisabled?: boolean;
}

const InsertInventoryForm = (props: InsertInventoryFormProps) => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const axiosPrivate = useAxiosPrivate();
    const { setSnackBar } = useSnackBar();
    const navigate = useNavigate();

    const handleOnClick = () => {
        if (!props.inventory.id.trim()) {
            return;
        }

        setOpenDeleteDialog(true);
    }

    const handleConfirmDelete = async () => {
        const response = await axiosPrivate.delete(DELETE_INVENTORY_URL(props.inventory.id));
        const data = response.data;

        if (data.error)
            setSnackBar({ children: data.error, severity: 'error' });
        else {
            navigate('/master-data/inventory-tree');
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

            <TextField required label="Nama Barang" size="small" autoFocus={props.autoFocus}
                name='itemName' value={props.inventory.itemName} onChange={props.handleFieldChanges} disabled={!props.isEditMode} />

            <TextField required label="Kode Barang" size="small"
                name='itemNo' value={props.inventory.itemNo} onChange={props.handleFieldChanges} disabled={!props.isEditMode} />

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
            title="Hapus data persediaan secara permanen?"
            description='Anda yakin ingin menghapus data persediaan?
            Tindakan ini tidak dapat dibatalkan dan akan menghapus semua informasi terkait persediaan,
            termasuk riwayat transaksi dan detail kontak.
            Pastikan Anda telah mempertimbangkan dengan cermat sebelum melanjutkan.'
        />

    </>
}

export default InsertInventoryForm;