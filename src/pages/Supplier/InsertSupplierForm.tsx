import { Box, Button, Stack, TextField } from "@mui/material"
import ISupplier from "../../models/ISupplier";


interface InsertSupplierFormProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleFieldChanges: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClickEdit?: () => void;
    onClickCancel: () => void;

    supplier: ISupplier;
    
    isEditMode: boolean;
    autoFocus?: boolean;
}

const InsertSupplierForm = (props: InsertSupplierFormProps) => {
    return <>
        <Stack
            component="form"
            onSubmit={props.handleSubmit}
            className="box-soft-shadow"
            p={3}
            borderRadius={3}
            spacing={2}
        >
            
            <TextField required label="Nama Pemasok" size="small" autoFocus={props.autoFocus}
                name='supplierName' value={props.supplier.supplierName} onChange={props.handleFieldChanges} disabled={!props.isEditMode} />

            <TextField required label="Kode Pemasok" size="small"
                name='supplierCode' value={props.supplier.supplierCode} onChange={props.handleFieldChanges} disabled={!props.isEditMode} />

            <TextField label="Alamat Pemasok" 
                name='supplierAddress' value={props.supplier.supplierAddress || ''} onChange={props.handleFieldChanges} disabled={!props.isEditMode} />

            {
                props.isEditMode ?
                    (
                        <Box display={"flex"}>
                            <Box>
                                <Button type="submit" variant="contained" sx={{ marginRight: "1rem" }}>
                                    Save
                                </Button>
                            </Box>
                            <Box>
                                <Button variant='outlined' color='warning' onClick={props.onClickCancel}>
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    ) : (
                        <Box display={"flex"}>
                            <Button variant="contained" color="primary" sx={{ marginRight: "1rem" }} onClick={props.onClickEdit}>
                                Edit
                            </Button>

                            <Button variant="outlined" color="warning">
                                Delete
                            </Button>
                        </Box>
                    )
            }
        </Stack>
    </>
}

export default InsertSupplierForm;