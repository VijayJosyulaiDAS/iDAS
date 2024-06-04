import FuseNavigation from '@fuse/core/FuseNavigation';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import {ChangeEvent} from "react";
import {selectSearchText, setSearchText} from "../recommendationBox/recommendationAppSlice";
import InputAdornment from "@mui/material/InputAdornment";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {OutlinedInput} from "@mui/material";
import {useAppDispatch, useAppSelector} from "app/store/hooks";


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


const convertToNavigationData = (useCases) => {
	return useCases.map((useCase, index) => ({
		id: (index + 1).toString(),
		title: useCase.name,
		type: 'item',

	}));
};

const navigationData: FuseNavItemType[] = convertToNavigationData(useCases);


/**
 * The LandingSidebar component.
 */
function landingPageSideBar({ onItemClick }) {
	const dispatch = useAppDispatch()
	const searchText = useAppSelector(selectSearchText);



	const handleItemClick = (item) => {
		onItemClick(item);
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
