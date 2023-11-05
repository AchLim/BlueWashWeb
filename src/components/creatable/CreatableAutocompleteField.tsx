import { Autocomplete, Dialog, DialogContent, DialogTitle, FilterOptionsState, TextField, createFilterOptions } from '@mui/material';
import React, { useState } from 'react';

interface ICreatableAutocompleteGeneric {
    inputValue?: string;
}

interface ICreatableAutocompleteFieldProps<T> {
    autoCompleteId: string;
    autoCompleteOptions: Array<T>;
    autoCompleteValue: T;
    autoCompleteNameGet: (option: T) => string;
    autoCompleteInputLabel: string;
    autoCompleteNoOptionsText: string;
    autoCompleteRequired: boolean;
    autoCompleteOptionEqualToValue: (option: T, value: T) => boolean;
    autoCompleteOnChangeString: (event: React.SyntheticEvent<Element, Event>, value: string) => void;
    autoCompleteOnChangeUncreatedRecord: (event: React.SyntheticEvent<Element, Event>, value: T) => void;
    autoCompleteOnChangeExistingRecord: (event: React.SyntheticEvent<Element, Event>, value: T | null) => void
    autoCompleteFilterOptions: (options: T[], state: FilterOptionsState<T>) => T[];

    dialogFullWidth?: boolean;
    dialogMaxWidth?: "lg" | "md" | "sm" | "xl" | "xs";

    dialogTitle: string;
    dialogContent: React.JSX.Element;

    openDialog: boolean;
    setOpenDialog: (value: React.SetStateAction<boolean>) => void;

}

const CreatableAutocompleteField = <T extends ICreatableAutocompleteGeneric> (props: ICreatableAutocompleteFieldProps<T>) => {
    const HandleAutocompleteGetOptionLabel = (option: T | string) => {
        if (typeof option === 'string') {
            return option;
        }

        if (option.inputValue)
            return option.inputValue;
        
        return props.autoCompleteNameGet(option);
    }

    const HandleAutocompleteOnChange = (event: React.SyntheticEvent<Element, Event>, value: string | T | null) => {
        if (typeof value === 'string') {
            setTimeout(() => {
                props.setOpenDialog(true);
                props.autoCompleteOnChangeString(event, value);
            });
        } else if (value && value.inputValue) {
            props.setOpenDialog(true);
            props.autoCompleteOnChangeUncreatedRecord(event, value);
        } else {
            props.autoCompleteOnChangeExistingRecord(event, value);
        }
    }

    return <React.Fragment>
        <Autocomplete
            id={props.autoCompleteId}
            value={props.autoCompleteValue}
            getOptionLabel={(option) => HandleAutocompleteGetOptionLabel(option)}
            options={props.autoCompleteOptions}
            noOptionsText={props.autoCompleteNoOptionsText}
            onChange={HandleAutocompleteOnChange}
            filterOptions={props.autoCompleteFilterOptions}
            isOptionEqualToValue={(option, value) => props.autoCompleteOptionEqualToValue(option, value)}

            renderInput={(params) => {
                return <TextField {...params} label={props.autoCompleteInputLabel} required={props.autoCompleteRequired} />
            }}

            disablePortal
            selectOnFocus
            freeSolo
            clearOnBlur
            clearOnEscape
            handleHomeEndKeys
            autoHighlight
        />

        <Dialog open={props.openDialog} fullWidth={props.dialogFullWidth} maxWidth={props.dialogMaxWidth}>
            <DialogTitle>{props.dialogTitle}</DialogTitle>
            <DialogContent>
                {props.dialogContent}
            </DialogContent>
        </Dialog>

    </React.Fragment>

}

export default CreatableAutocompleteField;