interface IChartOfAccount {
    id: string;
    accountHeaderNo: number;
    accountHeaderName: string;
    accountNo: number;
    accountName: string;
}

export default IChartOfAccount;

export const EmptyChartOfAccount = () : IChartOfAccount => {
	return {
		'id': '',
		'accountHeaderNo': 0,
		'accountHeaderName': '',
		'accountNo': 0,
		'accountName': ''
	}
}

export const GetAccountHeaderNameByNo = (no: number | string) => {
	let accountHeaderName = '';
	switch (no) {
		case 100:
			accountHeaderName = 'Asset';
			break;
		case 200:
			accountHeaderName = 'Liabilitas';
			break;
		case 300:
			accountHeaderName = 'Ekuitas';
			break;
		case 400:
			accountHeaderName = 'Pendapatan';
			break;
		case 500:
			accountHeaderName = 'Harga Pokok Penjualan';
			break;
		case 600:
			accountHeaderName = 'Pengeluaran';
			break;

		default:
			break;
	}

	return accountHeaderName;
}