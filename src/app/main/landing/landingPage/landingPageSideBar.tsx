import FuseNavigation from '@fuse/core/FuseNavigation';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import React, {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import FuseLoading from "@fuse/core/FuseLoading";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import {useParams} from "react-router-dom";

/**
 * The LandingSidebar component.
 */
function landingPageSideBar(props) {
	const {data,onItemClick} = props
	const {folderHandle} = useParams()
	const [useCases, setUseCases] = useState([])
	const [loading, setLoading] = useState<boolean>(false)
	const [searchText, setSearchText] = useState('');
	const [filteredNavigationData, setFilteredNavigationData] = useState<FuseNavItemType[]>([]);

	function handleSearchText(event: React.ChangeEvent<HTMLInputElement>) {
		setSearchText(event.target.value);
	}

	const fetchUseCases = async () => {
		setLoading(true);
		let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/get_useCases`)
		const order = ["Supplier PO Amendments" ,"Firm Zone Production Adjustments", ];
		const orderedItems = response.data.data.filter(item => order.includes(item.title));
		const remainingItems = response.data.data.filter(item => !order.includes(item.title));
		const result = [
			...orderedItems.sort((a, b) => order.indexOf(a.title) - order.indexOf(b.title)),
			...remainingItems
		];
		if(folderHandle != null || folderHandle != undefined){
			let data = response.data.data.filter((item) => item.id === folderHandle)
			onItemClick(data[0])
			setUseCases(result)
			setLoading(false);
		}else{
			onItemClick(result[0])
			setUseCases(result)
			setLoading(false);
		}
	}

	useEffect(() => {
		if(data != null || data != undefined){
			setUseCases(data)
			onItemClick(data)
		}else{
			fetchUseCases()
		}
	}, []);

	const convertToNavigationData = (useCases) => {
		const totalItem = {
			id: 'total',
			title: `Total Recommendations`,
			type: 'item',
		};
		const navigationData = useCases.map((useCase) => ({
			id: useCase.id.toString(),
			title: useCase.title,
			type: 'item',
		}));
		return [totalItem, ...navigationData];
	};


	useEffect(() => {
		const convertToNavigationData = (useCases) => {
			const totalItem = {
				id: 'total',
				title: `Total Recommendations`,
				type: 'item',
			};
			const navigationData = useCases.map((useCase) => ({
				id: useCase.id.toString(),
				title: useCase.title,
				type: 'item',
			}));
			return [totalItem, ...navigationData];
		};


		const filteredData = useCases.filter(useCase =>
			useCase.title.toLowerCase().includes(searchText.toLowerCase())
		);

		setFilteredNavigationData(convertToNavigationData(filteredData));
	}, [useCases, searchText]);

	const navigationData: FuseNavItemType[] = convertToNavigationData(useCases);

	const handleItemClick = (item) => {
		onItemClick(item);
		console.log(navigationData)
	};



	return (
		<div className="py-24 flex flex-col justify-between gap-20">
			<div className="flex flex-col gap-10 ml-24 p-4 text-3xl font-bold ">
				Skills
				<Paper className="flex p-4 items-center w-full py-4 border-1 h-40 rounded-full shadow-none">
					<FuseSvgIcon
						color="action"
						size={20}
					>
						heroicons-solid:search
					</FuseSvgIcon>

					<Input
						placeholder="Search for skills"
						className="flex flex-1 px-0"
						disableUnderline
						fullWidth
						value={searchText}
						inputProps={{
							'aria-label': 'Search'
						}}
						onChange={handleSearchText}
					/>
				</Paper>
			</div>
			{
				loading ? (
					<FuseLoading></FuseLoading>
				) : (
					<FuseNavigation
						navigation={filteredNavigationData}
						onItemClick={handleItemClick}
						className="px-0 "
					/>
				)
			}
		</div>
	);
}

export default landingPageSideBar;
