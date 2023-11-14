import IChartOfAccount, { EmptyChartOfAccount } from "./IChartOfAccount";

interface IGeneralJournalHeader {
    id: string;
	transactionNo: string;
	transactionDate: Date; // in reality, C# sends a string.
	description: string;
	generalJournalDetails: Array<IGeneralJournalDetail>;
}

export interface IGeneralJournalDetail {
	generalJournalHeaderId: string | null;
	generalJournalDetailId: string;

	chartOfAccount: IChartOfAccount;
	chartOfAccountId: string;

	debit: number;
	credit: number;
}

export default IGeneralJournalHeader;

export const EmptyGeneralJournal = () : IGeneralJournalHeader => {
	return {
		'id': '',
		'transactionNo': '',
		'transactionDate': new Date(),
		'description': '',
		'generalJournalDetails': []
	}
}

export const EmptyGeneralJournalDetail = (): IGeneralJournalDetail => {
	return {
		'generalJournalHeaderId': null,
		'generalJournalDetailId': '',
		'chartOfAccount': EmptyChartOfAccount(),
		'chartOfAccountId': '',
		'debit': 0,
		'credit': 0,
	}
}