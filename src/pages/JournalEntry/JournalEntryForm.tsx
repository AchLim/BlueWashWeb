import { useState, useEffect } from 'react';
import { Box, Breadcrumbs, Typography } from "@mui/material";
import Header from "../../components/Header";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useSnackBar from '../../hooks/useSnackBar';
import { GET_JOURNAL_ENTRY_BY_ID, UPDATE_JOURNAL_ENTRY_URL } from '../../axios';
import IJournalEntry, { EmptyJournalEntry } from '../../models/IJournalEntry';
import InsertJournalEntryForm from './InsertJournalEntryForm';
import { ConvertDateTimeToDate } from '../../utils/Converter';

const JournalEntryForm: React.FC = () => {
	const { id } = useParams();
	const [journalEntry, setJournalEntry] = useState<IJournalEntry>(EmptyJournalEntry);
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const axiosPrivate = useAxiosPrivate();
	const { setSnackBar } = useSnackBar();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const fetchGeneralJournal = async () => {
			const response = await axiosPrivate.get(GET_JOURNAL_ENTRY_BY_ID(id!));
			const data: IJournalEntry = response.data;
			if (data) {
				setJournalEntry(data);
			} else {
				navigate('/', { state: { from: location }, replace: true });
				setSnackBar({ children: "Data yang terpilih tidak ditemukan.", severity: 'error' });
			}
		};

		fetchGeneralJournal();
	}, [id, isEditMode, axiosPrivate, navigate, location, setSnackBar]);

	const onClickEdit = () => {
		setJournalEntry(journalEntry);
		setIsEditMode(true);
	};

	const onClickCancel = () => {
		setJournalEntry(journalEntry);
		setIsEditMode(false);
	};

	const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
		setJournalEntry((prevJournalEntry) => ({
			...prevJournalEntry,
			[event.target.name]: event.target.value,
		}));
	};

	const handleDateChanges = (value: Date | null) => {
		const newValue = value || new Date();
		setJournalEntry((prevJournalEntry) => ({
			...prevJournalEntry,
			transactionDate: ConvertDateTimeToDate(newValue)
		}));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const response = await axiosPrivate.put(UPDATE_JOURNAL_ENTRY_URL(id!), journalEntry);
		const data = response.data;

		if (data.error) {
			setSnackBar({ children: data.error, severity: 'error' });
		} else {
			setSnackBar({ children: 'Data berhasil disimpan!', severity: 'success' });
			setJournalEntry(response.data);
			setIsEditMode(false);
		}
	};

	return (
		<>
			<Header title="Jurnal Umum" />
			<Box paddingBlock={1} marginBottom={3}>
				<Breadcrumbs aria-label="breadcrumb">
					<Typography color="text.disabled">Master Data</Typography>
					<Typography component={Link} to={'../'} color="primary" sx={{ textDecoration: 'none' }}>Jurnal Umum</Typography>
					<Typography>{journalEntry.transactionNo}</Typography>
				</Breadcrumbs>
			</Box>

			<InsertJournalEntryForm
				handleFieldChanges={handleChanges}
				handleSubmit={handleSubmit}
				handleDateFieldChanges={handleDateChanges}
				onClickEdit={onClickEdit}
				onClickCancel={onClickCancel}
				journalEntry={journalEntry}
				setJournalEntry={setJournalEntry}
				isEditMode={isEditMode}
			/>
		</>
	);
};

export default JournalEntryForm;
