import FusePageSimple from '@fuse/core/FusePageSimple/FusePageSimple';
import Typography from '@mui/material/Typography';
import Masonry from 'react-masonry-css';
import NotificationCard from './NotificationCard';
import NotificationsAppHeader from './NotificationsAppHeader';
import axios from "axios";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";

function NotificationsApp() {

	const [notifications, setNotifications] = useState([])

	const fetchRecommendations = async () => {
		try {
			let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/get_recommendations`);
			let data = response.data.data.map(item => ({
				id: item.id.toString(),
				title: item.description,
				description: `The Demand Forecast is predicting an ${item.demand_type} in Demand of ${(item.demand_value).toFixed(2)} for the Material Code ${item.material_code}. Based on the available inventory of ${item.available_inventory_value} and a Lead Time 
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

	function handleDismiss(id: string) {
	}


	return (
		<FusePageSimple
			header={<NotificationsAppHeader />}
			content={
				<div className="flex flex-col w-full p-24 mt-24">
					<Masonry
						breakpointCols={{
							default: 4,
							960: 3,
							600: 2,
							480: 1
						}}
						className="my-masonry-grid flex w-full"
						columnClassName="my-masonry-grid_column flex flex-col p-8"
					>
						{notifications?.map((notification) => (
							<NotificationCard
								key={notification.id}
								className="mb-16"
								item={notification}
								onClose={handleDismiss}
							/>
						))}
					</Masonry>
					{notifications.length === 0 && (
						<div className="flex flex-1 items-center justify-center p-16">
							<Typography
								className="text-center text-24"
								color="text.secondary"
							>
								There are no notifications for now.
							</Typography>
						</div>
					)}
				</div>
			}
		/>
	);
}

export default NotificationsApp;
