import { useState, useEffect } from 'react';
import { Box, Breadcrumbs, Typography } from "@mui/material";
import Header from "../../components/Header";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useSnackBar from '../../hooks/useSnackBar';
import { GET_GENERAL_JOURNAL_HEADER_BY_ID_URL, UPDATE_GENERAL_JOURNAL_HEADER_URL } from '../../axios';
import IGeneralJournalHeader, { EmptyGeneralJournal } from '../../models/IGeneralJournal';
import InsertGeneralJournalForm from './InsertGeneralJournalForm';

const GeneralJournalForm: React.FC = () => {
	const { id } = useParams();
	const [generalJournal, setGeneralJournal] = useState<IGeneralJournalHeader>(EmptyGeneralJournal);
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const axiosPrivate = useAxiosPrivate();
	const { setSnackBar } = useSnackBar();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const fetchGeneralJournal = async () => {
			const response = await axiosPrivate.get(GET_GENERAL_JOURNAL_HEADER_BY_ID_URL(id!));
			const data: IGeneralJournalHeader = response.data;
			if (data) {
				setGeneralJournal(data);
			} else {
				navigate('/', { state: { from: location }, replace: true });
				setSnackBar({ children: "Data yang terpilih tidak ditemukan.", severity: 'error' });
			}
		};

		fetchGeneralJournal();
	}, [id, isEditMode, axiosPrivate, navigate, location, setSnackBar]);

	const onClickEdit = () => {
		setGeneralJournal(generalJournal);
		setIsEditMode(true);
	};

	const onClickCancel = () => {
		setGeneralJournal(generalJournal);
		setIsEditMode(false);
	};

	const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
		setGeneralJournal((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	const handleDateChanges = (value: Date | null) => {
		const newValue = value || new Date();
		setGeneralJournal((prevState) => ({
			...prevState,
			transactionDate: newValue
		}));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const response = await axiosPrivate.put(UPDATE_GENERAL_JOURNAL_HEADER_URL(id!), generalJournal);
		const data = response.data;

		if (data.error) {
			setSnackBar({ children: data.error, severity: 'error' });
		} else {
			setSnackBar({ children: 'Data berhasil disimpan!', severity: 'success' });
			setGeneralJournal(response.data);
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
					<Typography>{generalJournal.transactionNo}</Typography>
				</Breadcrumbs>
			</Box>

			<InsertGeneralJournalForm
				handleFieldChanges={handleChanges}
				handleSubmit={handleSubmit}
				handleDateFieldChanges={handleDateChanges}
				onClickEdit={onClickEdit}
				onClickCancel={onClickCancel}
				generalJournal={generalJournal}
				setGeneralJournal={setGeneralJournal}
				isEditMode={isEditMode}
			/>
		</>
	);
};

export default GeneralJournalForm;
