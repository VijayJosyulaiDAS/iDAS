import FuseNavigation from '@fuse/core/FuseNavigation';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import {ChangeEvent, useEffect, useState} from "react";
import InputAdornment from "@mui/material/InputAdornment";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {OutlinedInput} from "@mui/material";
import {useAppDispatch, useAppSelector} from "app/store/hooks";
import {useLocation} from "react-router-dom";
import axios from "axios";


/**
 * Navigation data
 */

const useCases = [
	{
		name: "Firm Zone Production Adjustments",
		status: "Open",
		count: 34,
		description: "Adjusting production levels in designated firm zones based on various triggers to optimize output and resource allocation.",
		data: [
			{
				id: '3.1',
				title: 'Open Recommendations',
				type: 'item',
				url: ''
			},
			{
				id: '3.2',
				title: 'Close Recommendations',
				type: 'item',
			}
		]
	},
	{
		name: "Supplier PO Amendments",
		status: "Close",
		count: 32,
		description: "Modifying purchase orders from suppliers to reflect changes in demand, supply chain disruptions, or updated agreements.",
		data: [
			{
				id: '3.1',
				title: 'Open Recommendations',
				type: 'item'
			},
			{
				id: '3.2',
				title: 'Close Recommendations',
				type: 'item',
			}
		]
	},
	{
		name: "Realtime Supply Confirmation for Upsides",
		status: "Open",
		count: 31,
		description: "Providing real-time confirmation of supply availability to accommodate sudden increases in demand, ensuring supply chain responsiveness.",
		data: [
			{
				id: '3.1',
				title: 'Open Recommendations',
				type: 'item',
			},
			{
				id: '3.2',
				title: 'Close Recommendations',
				type: 'item',
			}
		]
	}
];



/**
 * The LandingSidebar component.
 */
function landingPageSideBar(props) {

	const {data,onItemClick} = props
	const [useCases, setUseCases] = useState([])

	const fetchUseCases = async () => {
		let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/get_useCases`)
		setUseCases(response.data.data)
	}

	useEffect(() => {
		if(data != null || data != undefined){
			setUseCases(data)
		}else{
			fetchUseCases()
		}
	}, []);
	const convertToNavigationData = (useCases) => {
		return useCases.map((useCase, index) => ({
			id: (useCase.id).toString(),
			title: useCase.title,
			type: 'item',
		}));
	};

	const navigationData: FuseNavItemType[] = convertToNavigationData(useCases);

	const handleItemClick = (item) => {
		onItemClick(item);
		console.log(item)
	};



	return (
		<div className="py-24 ">
			<div className=" ml-24 text-3xl font-bold ">
				Use Cases List
				{/*<OutlinedInput*/}
				{/*	className="flex flex-1 items-center px-16 rounded-full"*/}
				{/*	fullWidth*/}
				{/*	placeholder={'Search For Recommendations'}*/}
				{/*	value={searchText}*/}
				{/*	onChange={(ev: ChangeEvent<HTMLInputElement>) => dispatch(setSearchText(ev))}*/}
				{/*	startAdornment={*/}
				{/*		<InputAdornment position="start">*/}
				{/*			<FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>*/}
				{/*		</InputAdornment>*/}
				{/*	}*/}
				{/*	inputProps={{*/}
				{/*		'aria-label': 'Search'*/}
				{/*	}}*/}
				{/*	size="small"*/}
				{/*/>*/}
			</div>

			<FuseNavigation
				navigation={navigationData}
				onItemClick={handleItemClick}
				className="px-0 mt-32"
			/>
		</div>
	);
}

export default landingPageSideBar;
