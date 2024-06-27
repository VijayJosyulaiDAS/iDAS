import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'app/store/hooks';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import {ReactNode, useEffect, useState} from 'react';
import { toggleNotificationPanel } from './notificationPanelSlice';
import axios from "axios";
import {toast} from "react-toastify";

type NotificationPanelToggleButtonProps = {
	children?: ReactNode;
};

/**
 * The notification panel toggle button.
 */
function NotificationPanelToggleButton(props: NotificationPanelToggleButtonProps) {
	const { children = <FuseSvgIcon>heroicons-outline:bell</FuseSvgIcon> } = props;
	const [notifications, setNotifications] = useState([])

	const fetchRecommendations = async () => {
		try {
			let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/get_recommendations`);
			let data = response.data.data.map(item => ({
				id: item.id.toString(),
				title: item.description,
				description: `The Demand Forecast is predicting an ${item.demand_type} in Demand of ${(item.po_quantity_value).toFixed(2)} for the Material Code ${item.material_code}. Based on the available inventory of ${item.available_inventory_value} and a Lead Time 
            of ${item.lead_time} days, you should ${item.order_type} ${item.po_number} with the Quantity ${item.po_quantity_value}`,
				time: item["createdAt"],
				read: true,
				link: `/apps/landing/${item.use_case_id}`,
				useRouter: true
			}))
			setNotifications(data);
		} catch (error) {
			console.error('Failed to fetch recommendations:', error);
			toast.error(`Something Went Wrong while fetching data.`, {autoClose: 1500})
		}
	};

	useEffect(() => {
		fetchRecommendations();
	}, []);

	const dispatch = useAppDispatch();

	return (
		<IconButton
			className="h-40 w-40"
			onClick={() => dispatch(toggleNotificationPanel())}
			size="large"
		>
			<Badge
				color="secondary"
				badgeContent={notifications?.length > 0 ? notifications.length : 0}
				invisible={notifications?.length === 0}
			>
				{children}
			</Badge>
		</IconButton>

	);
}

export default NotificationPanelToggleButton;
