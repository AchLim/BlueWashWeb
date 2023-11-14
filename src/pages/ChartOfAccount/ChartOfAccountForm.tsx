import { useState, useEffect } from 'react';
import {
	Box,
	Breadcrumbs,
	SelectChangeEvent,
	Typography,
} from "@mui/material";
import Header from "../../components/Header";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useSnackBar from '../../hooks/useSnackBar';
import IChartOfAccount, { EmptyChartOfAccount, GetAccountHeaderNameByNo } from '../../models/IChartOfAccount';
import { GET_CHART_OF_ACCOUNT_BY_ID_URL, UPDATE_CHART_OF_ACCOUNT_URL } from '../../axios';
import InsertChartOfAccountForm from './InsertChartOfAccountForm';


const ChartOfAccountForm = () => {
	const params = useParams();
	const [chartOfAccount, setChartOfAccount] = useState<IChartOfAccount>(EmptyChartOfAccount);

	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const axiosPrivate = useAxiosPrivate();
	const { setSnackBar } = useSnackBar();
	const navigate = useNavigate();
	const location = useLocation();


	let ChartOfAccountId = params.id;
	if (typeof ChartOfAccountId === 'undefined') {
		return <div>Invalid request, please reload.</div>
	}

	useEffect(() => {
		const fetchChartOfAccount = async () => {
			var response = await axiosPrivate.get(GET_CHART_OF_ACCOUNT_BY_ID_URL(ChartOfAccountId!));

			var data: IChartOfAccount = response.data;
			if (data) {
				setChartOfAccount(data);
			} else {
				navigate('/', { state: { from: location }, replace: true });
				setSnackBar({ children: "Data yang terpilih tidak ditemukan.", severity: 'error' });
			}
		};

		fetchChartOfAccount().catch(console.error);
	}, [isEditMode])

	const onClickEdit = () => {
		setChartOfAccount(chartOfAccount);
		setIsEditMode(true);
	}

	const onClickCancel = () => {
		setChartOfAccount(chartOfAccount);
		setIsEditMode(false);
	}

	const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChartOfAccount((prevState: IChartOfAccount) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	}

	const handleSelectAccountHeader = (event: SelectChangeEvent) => {
		let accountHeaderNo: number | string = parseInt(event.target.value);
        if (isNaN(accountHeaderNo)) {
            accountHeaderNo = '';
        }

		let accountHeaderName: string = GetAccountHeaderNameByNo(accountHeaderNo);

		setChartOfAccount((prevState: IChartOfAccount) => ({
			...prevState,
			[event.target.name]: accountHeaderNo,
			accountHeaderName: accountHeaderName,
		}));
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const response = await axiosPrivate.put(UPDATE_CHART_OF_ACCOUNT_URL(ChartOfAccountId!), chartOfAccount);

		const data = response.data;

		if (data.error) {
			setSnackBar({ children: data.error, severity: 'error' });
		} else {
			setSnackBar({ children: 'Data berhasil disimpan!', severity: 'success' });
			setChartOfAccount(response.data);
			setIsEditMode(false);
		}
	}

	return (
		<>
			<Header title="Chart of Account" />
			<Box paddingBlock={1} marginBottom={3}>
				<Breadcrumbs aria-label="breadcrumb">
					<Typography color="text.disabled">Master Data</Typography>
					<Typography component={Link} to={'../'} color="primary" sx={{ textDecoration: 'none' }}>Chart of Account</Typography>
					<Typography>{chartOfAccount.accountNo} - {chartOfAccount.accountName}</Typography>
				</Breadcrumbs>
			</Box>
			<InsertChartOfAccountForm
				handleFieldChanges={handleChanges}
				handleSubmit={handleSubmit}
				handleSelectAccountHeader={handleSelectAccountHeader}
				onClickEdit={onClickEdit}
				onClickCancel={onClickCancel}

				chartOfAccount={chartOfAccount}
				isEditMode={isEditMode}
			/>
		</>
	);
};

export default ChartOfAccountForm;
