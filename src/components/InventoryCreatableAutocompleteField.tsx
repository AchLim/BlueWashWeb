import { createFilterOptions } from '@mui/material';
import CreatableAutocompleteField from './CreatableAutocompleteField';
import IInventory, { EmptyInventory } from '../models/IInventory';

interface IInventoryCreatableAutocompleteFieldProps {

    fieldId: string;
    fieldLabel: string;
    optionList: Array<IInventory>;

    inventoryValue: IInventory;
    setInventoryValue: (value: IInventory) => void;

    // newInventory: IInventory;
    setNewInventory: (value: React.SetStateAction<IInventory>) => void;

    setOpenDialog: (value: React.SetStateAction<boolean>) => void;
}

const InventoryFilter = createFilterOptions<IInventory>();

const InventoryCreatableAutocompleteField = (props: IInventoryCreatableAutocompleteFieldProps) => {

    return <>
        <CreatableAutocompleteField
            autoCompleteId={props.fieldId}
            autoCompleteInputLabel={props.fieldLabel}
            autoCompleteOptions={props.optionList}
            autoCompleteValue={props.inventoryValue}
            autoCompleteOnChangeString={() => {
                props.setOpenDialog(true);
                props.setNewInventory(EmptyInventory);
            }}
            autoCompleteOnChangeUncreatedRecord={(event, value) => {
                props.setOpenDialog(true);
                props.setNewInventory({
                    ...EmptyInventory(),
                    itemNo: value.itemNo,
                    itemName: value.itemName,
                })
            }}
            autoCompleteOnChangeExistingRecord={(event, value) => {
                props.setInventoryValue(value || EmptyInventory())
            }}
            autoCompleteFilterOptions={(options, params) => {
                const filtered = InventoryFilter(options, params);
                if (filtered.length === 0 && params.inputValue.trim()) {
                    filtered.push({
                        ...EmptyInventory(),
                        itemName: params.inputValue,
                        inputValue: `Tambah data "${params.inputValue}"`
                    });
                }

                return filtered;
            }}
            
            autoCompleteNameGet={(option) => {
                if (option.itemNo) {
                    return `${option.itemNo} ${option.itemName}`;
                }

                return "";
            }}
            autoCompleteNoOptionsText='Data persediaan kosong.'
            autoCompleteOptionEqualToValue={(option, value) => {
                return option.itemNo === value.itemNo;
            }}
            autoCompleteRequired
        />
    </>

}

export default InventoryCreatableAutocompleteField;