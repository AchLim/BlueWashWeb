import { Box, Button, IconButton, Stack, TextField } from "@mui/material"
import ICustomer from "../../components/models/ICustomer";


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

                            <Button variant="outlined" color="warning">
                                Delete
                            </Button>
                        </Box>
                    )
            }
        </Stack>
    </>
}

export default InsertCustomerForm;