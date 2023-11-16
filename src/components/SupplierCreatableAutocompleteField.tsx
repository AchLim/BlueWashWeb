import { createFilterOptions } from '@mui/material';
import CreatableAutocompleteField from './CreatableAutocompleteField';
import ISupplier, { EmptySupplier } from '../models/ISupplier';

interface ISupplierCreatableAutocompleteFieldProps {

    fieldId: string;
    fieldLabel: string;
    optionList: Array<ISupplier>;

    supplierValue: ISupplier;
    setSupplierValue: (value: ISupplier) => void;

    // newSupplier: ISupplier;
    setNewSupplier: (value: React.SetStateAction<ISupplier>) => void;

    setOpenDialog: (value: React.SetStateAction<boolean>) => void;
}

const SupplierFilter = createFilterOptions<ISupplier>();

const SupplierCreatableAutocompleteField = (props: ISupplierCreatableAutocompleteFieldProps) => {

    return <>
        <CreatableAutocompleteField
            autoCompleteId={props.fieldId}
            autoCompleteInputLabel={props.fieldLabel}
            autoCompleteOptions={props.optionList}
            autoCompleteValue={props.supplierValue}
            autoCompleteOnChangeString={() => {
                props.setOpenDialog(true);
                props.setNewSupplier(EmptySupplier);
            }}
            autoCompleteOnChangeUncreatedRecord={(event, value) => {
                props.setOpenDialog(true);
                props.setNewSupplier({
                    ...EmptySupplier(),
                    supplierName: value.supplierName,
                    supplierCode: value.supplierCode,
                    supplierAddress: value.supplierAddress
                })
            }}
            autoCompleteOnChangeExistingRecord={(event, value) => {
                props.setSupplierValue(value || EmptySupplier())
            }}
            autoCompleteFilterOptions={(options, params) => {
                const filtered = SupplierFilter(options, params);
                if (filtered.length === 0 && params.inputValue.trim()) {
                    filtered.push({
                        ...EmptySupplier(),
                        supplierName: params.inputValue,
                        inputValue: `Tambah data "${params.inputValue}"`
                    });
                }

                return filtered;
            }}
            
            autoCompleteNameGet={(option) => {
                if (option.supplierCode) {
                    return `${option.supplierCode} ${option.supplierName}`;
                }

                return "";
            }}
            autoCompleteNoOptionsText='Data pemasok kosong.'
            autoCompleteOptionEqualToValue={(option, value) => {
                return option.supplierCode === value.supplierCode;
            }}
            autoCompleteRequired
        />
    </>

}

export default SupplierCreatableAutocompleteField;