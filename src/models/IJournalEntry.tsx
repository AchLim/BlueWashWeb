import { ConvertDateTimeToDate } from "../utils/Converter";
import IChartOfAccount, { EmptyChartOfAccount } from "./IChartOfAccount";

interface IJournalEntry {
    id: string;
	transactionNo: string;
	transactionDate: string;
	description: string;
	journalItems: Array<IJournalItem>;
}

export interface IJournalItem {
	journalEntryId: string | null;
	journalItemId: string;

	chartOfAccount: IChartOfAccount;
	chartOfAccountId: string;

	debit: number;
	credit: number;
}

export default IJournalEntry;

export const EmptyJournalEntry = () : IJournalEntry => {
	return {
		'id': '',
		'transactionNo': '',
		'transactionDate': ConvertDateTimeToDate(new Date()),
		'description': '',
		'journalItems': []
	}
}

export const EmptyJournalItem = (): IJournalItem => {
	return {
		'journalEntryId': null,
		'journalItemId': '',
		'chartOfAccount': EmptyChartOfAccount(),
		'chartOfAccountId': '',
		'debit': 0,
		'credit': 0,
	}
}