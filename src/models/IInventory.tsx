interface IInventory {
    id: string;
    itemNo: string;
    itemName: string;

	inputValue?: string;
}

export default IInventory;

export const EmptyInventory = () : IInventory => {
	return {
		'id': '',
		'itemNo': '',
		'itemName': '',
	}
}