import { useState, useEffect } from 'react';
import { Box, Breadcrumbs, Typography } from "@mui/material";
import Header from "../../components/Header";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useSnackBar from '../../hooks/useSnackBar';
import { ConvertDateTimeToDate } from '../../utils/Converter';
import IPurchaseHeader, { EmptyPurchaseHeader } from '../../models/IPurchase';
import { GET_PURCHASE_HEADER_BY_ID_URL, UPDATE_PURCHASE_HEADER_URL } from '../../axios';
import InsertPurchaseHeaderForm from './InsertPurchaseHeaderForm';

const PurchaseForm = () => {
	const { id } = useParams();
	const { setSnackBar } = useSnackBar();
	const location = useLocation();
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();

	const [purchaseHeader, setPurchaseHeader] = useState<IPurchaseHeader>(EmptyPurchaseHeader);
	const [isEditMode, setIsEditMode] = useState<boolean>(false);

	useEffect(() => {
		const fetchPurchaseHeader = async () => {
			const response = await axiosPrivate.get(GET_PURCHASE_HEADER_BY_ID_URL(id!));
			const data: IPurchaseHeader = response.data;
			if (data) {
				setPurchaseHeader(data);
			} else {
				navigate('/', { state: { from: location }, replace: true });
				setSnackBar({ children: "Data yang terpilih tidak ditemukan.", severity: 'error' });
			}
		};

		fetchPurchaseHeader();
	}, [isEditMode]);

	const onClickEdit = () => {
		setPurchaseHeader(purchaseHeader);
		setIsEditMode(true);
	};

	const onClickCancel = () => {
		setPurchaseHeader(purchaseHeader);
		setIsEditMode(false);
	};

	const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPurchaseHeader((prevPurchaseHeader) => ({
			...prevPurchaseHeader,
			[event.target.name]: event.target.value,
		}));
	};

	const handleDateChanges = (value: Date | null) => {
		const newValue = value || new Date();
		setPurchaseHeader((prevPurchaseHeader) => ({
			...prevPurchaseHeader,
			transactionDate: ConvertDateTimeToDate(newValue)
		}));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const response = await axiosPrivate.put(UPDATE_PURCHASE_HEADER_URL(id!), purchaseHeader);
		const data = response.data;

		if (data.error) {
			setSnackBar({ children: data.error, severity: 'error' });
		} else {
			setSnackBar({ children: 'Data berhasil disimpan!', severity: 'success' });
			setPurchaseHeader(response.data);
			setIsEditMode(false);
		}
	};

	return (
		<>
			<Header title="Pembelian" />
			<Box paddingBlock={1} marginBottom={3}>
				<Breadcrumbs aria-label="breadcrumb">
					<Typography color="text.disabled">Purchase</Typography>
					<Typography component={Link} to={'../'} color="primary" sx={{ textDecoration: 'none' }}>Pembelian</Typography>
					<Typography>{purchaseHeader.purchaseNo}</Typography>
				</Breadcrumbs>
			</Box>

			<InsertPurchaseHeaderForm
				handleFieldChanges={handleChanges}
				handleSubmit={handleSubmit}
				handleDateFieldChanges={handleDateChanges}
				onClickEdit={onClickEdit}
				onClickCancel={onClickCancel}
				purchaseHeader={purchaseHeader}
				setPurchaseHeader={setPurchaseHeader}
				isEditMode={isEditMode}
			/>
		</>
	);
};

export default PurchaseForm;
