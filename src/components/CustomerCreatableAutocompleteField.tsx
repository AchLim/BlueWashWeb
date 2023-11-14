import { Autocomplete, Dialog, DialogContent, DialogTitle, FilterOptionsState, TextField, createFilterOptions } from '@mui/material';
import React, { useState } from 'react';
import CreatableAutocompleteField from './CreatableAutocompleteField';
import InsertCustomerForm from '../pages/Customer/InsertCustomerForm';
import ICustomer, { EmptyCustomer } from '../models/ICustomer';
import { INSERT_CUSTOMER_URL } from '../axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

interface ICustomerCreatableAutocompleteFieldProps {

    fieldId: string;
    fieldLabel: string;
    optionList: Array<ICustomer>;

    customerValue: ICustomer;
    setCustomerValue: (value: React.SetStateAction<ICustomer>) => void;

    onSuccess?: (createdCustomer: ICustomer) => void;
    onError?: (errorMessage: string) => void;

}

const CustomerFilter = createFilterOptions<ICustomer>();

const CustomerCreatableAutocompleteField = (props: ICustomerCreatableAutocompleteFieldProps) => {
    const [newCustomer, setNewCustomer] = useState<ICustomer>(EmptyCustomer);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const axiosPrivate = useAxiosPrivate();

    const HandleCloseCustomerForm = () => {
        setNewCustomer(EmptyCustomer);
        setOpenDialog(false);
    }

    return <React.Fragment>
        <CreatableAutocompleteField
            autoCompleteId={props.fieldId}
            autoCompleteInputLabel={props.fieldLabel}
            autoCompleteOptions={props.optionList}
            autoCompleteValue={props.customerValue}
            autoCompleteOnChangeString={() => {
                setNewCustomer(EmptyCustomer);
            }}
            autoCompleteOnChangeUncreatedRecord={(event, value) => {
                setNewCustomer({
                    ...EmptyCustomer(),
                    customerName: value.customerName,
                    customerCode: value.customerCode,
                    customerAddress: value.customerAddress
                })
            }}
            autoCompleteOnChangeExistingRecord={(event, value) => {
                props.setCustomerValue(value || EmptyCustomer)
            }}
            autoCompleteFilterOptions={(options, params) => {
                const filtered = CustomerFilter(options, params);
                if (filtered.length === 0 && params.inputValue.trim()) {
                    filtered.push({
                        ...EmptyCustomer(),
                        customerName: params.inputValue,
                        inputValue: `Tambah data "${params.inputValue}"`
                    });
                }

                return filtered;
            }}
            
            autoCompleteNameGet={(option) => {
                if (option.customerCode) {
                    return `${option.customerCode} ${option.customerName}`;
                }

                return "";
            }}
            autoCompleteNoOptionsText='Data pelanggan kosong.'
            autoCompleteOptionEqualToValue={(option, value) => {
                return option.customerCode === value.customerCode;
            }}
            autoCompleteRequired
            dialogTitle='Tambah data pelanggan baru'
            dialogContent={<InsertCustomerForm
                autoFocus
                customer={newCustomer}
                handleFieldChanges={(event) => {
                    setNewCustomer({
                        ...newCustomer,
                        [event.target.name]: event.target.value,
                    })
                }}
                isEditMode={true}
                onClickCancel={HandleCloseCustomerForm}
                handleSubmit={async (event) => {
                    event.preventDefault();
    
                    var response = await axiosPrivate.post(INSERT_CUSTOMER_URL(), newCustomer);
                    if (response.status == 201) {
                        HandleCloseCustomerForm();
                        props.setCustomerValue(response.data);
                        props.onSuccess?.(response.data);
                    } else {
                        let data = response.data;
                        props.onError?.(data.error);
                    }
                }}
            />}
            dialogFullWidth
            dialogMaxWidth='md'
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
        />
    </React.Fragment>

}

export default CustomerCreatableAutocompleteField;