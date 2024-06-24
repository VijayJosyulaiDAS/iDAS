import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import {useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { useLocation } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import NotificationCard from './NotificationCard';
import {
	closeNotificationPanel,
	selectNotificationPanelState,
	toggleNotificationPanel
} from './notificationPanelSlice';
import NotificationModel from './models/NotificationModel';
import NotificationTemplate from './NotificationTemplate';
import axios from "axios";
import {toast} from "react-toastify";

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
	'& .MuiDrawer-paper': {
		backgroundColor: theme.palette.background.default,
		width: 320
	}
}));

/**
 * The notification panel.
 */
function NotificationPanel() {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const state = useAppSelector(selectNotificationPanelState);

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [notifications, setRowData] = useState([]);


	const fetchRecommendations = async () => {
		try {
			let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/get_recommendations`);
			let data = response.data.data.map(item => ({
					id: item.id,
					title: item.description == '' ? 'Amend the PO' : item.description,
				description: `The Demand Forecast is predicting an ${item.demand_type} in Demand of ${(item.po_quantity_value).toFixed(2)} for the Material Code ${item.material_code}. Based on the available inventory of ${(item.available_inventory_value).toFixed(2)} and a Lead Time 
            of ${item.lead_time} days, you should ${item.order_type} ${parseInt(item.po_number) ? parseInt(item.po_number) : 'New PO'} with the Quantity ${item.po_quantity_value} ${item.uom}`,
					time: item["createdAt"],
					read: true,
					link: `/apps/landing/${item.use_case_id}`,
					useRouter: true
			}))
			setRowData(data);
		} catch (error) {
			console.error('Failed to fetch recommendations:', error);
			toast.error(`Something Went Wrong while fetching data.`, {autoClose: 1500})
		}
	};

	useEffect(() => {
		fetchRecommendations();
	}, [location, dispatch]);

	useEffect(() => {
		if (state) {
			dispatch(closeNotificationPanel());
		}
	}, [location, dispatch]);

	function handleClose() {
		dispatch(closeNotificationPanel());
	}

	function handleDismiss(id: string) {
		console.log('close')
	}

	function handleDismissAll() {
	}

	 const handleClick = (tab) => {
		console.log(tab)
	};

	function demoNotification() {
		const item = NotificationModel({ title: 'Great Job! this is awesome.' });


		enqueueSnackbar(item.title, {
			key: item.id,

			// autoHideDuration: 3000,
			content: (
				<NotificationTemplate
					item={item}
					onClose={() => {
						closeSnackbar(item.id);
					}}
				/>
			)
		});
	}


	return (
		<StyledSwipeableDrawer
			open={state}
			anchor="right"
			onOpen={() => {}}
			onClose={() => dispatch(toggleNotificationPanel())}
			disableSwipeToOpen
		>
			<IconButton
				className="absolute right-0 top-0 z-999 m-4"
				onClick={handleClose}
				size="large"
			>
				<FuseSvgIcon color="action">heroicons-outline:x</FuseSvgIcon>
			</IconButton>

			<FuseScrollbars className="flex flex-col p-16 h-full">
				{notifications.length > 0 ? (
					<div className="flex flex-auto flex-col">
						<div className="mb-36 flex items-end justify-between pt-136">
							<Typography className="text-28 font-semibold leading-none">Notifications</Typography>
							<Typography
								className="cursor-pointer text-12 underline"
								color="secondary"
								onClick={handleDismissAll}
							>
								dismiss all
							</Typography>
						</div>
						{notifications.map((item) => (
							<NotificationCard
								key={item.id}
								className="mb-16"
								item={item}
								onClose={handleDismiss}
							/>
						))}
					</div>
				) : (
					<div className="flex flex-1 items-center justify-center p-16">
						<Typography
							className="text-center text-24"
							color="text.secondary"
						>
							There are no notifications for now.
						</Typography>
					</div>
				)}
			</FuseScrollbars>
		</StyledSwipeableDrawer>
	);
}

export default NotificationPanel;
