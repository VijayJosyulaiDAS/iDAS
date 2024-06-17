import FuseNavigation from '@fuse/core/FuseNavigation';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import React, {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import FuseLoading from "@fuse/core/FuseLoading";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";

/**
 * The LandingSidebar component.
 */
function landingPageSideBar(props) {

	const {data,onItemClick} = props
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
		// Define the order
		const order = ["Supplier PO Amendments" ,"Firm Zone Production Adjustments", ];

		// Separate the items based on the order
		const orderedItems = response.data.data.filter(item => order.includes(item.title));
		const remainingItems = response.data.data.filter(item => !order.includes(item.title));

		// Combine them in the desired order
		const result = [
			...orderedItems.sort((a, b) => order.indexOf(a.title) - order.indexOf(b.title)),
			...remainingItems
		];
		setUseCases(result)
		onItemClick(result[0])
		setLoading(false);
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

	useEffect(() => {
		// Convert useCases to navigation data whenever useCases or searchText changes
		const convertToNavigationData = (cases) => {
			return cases.map(useCase => ({
				id: useCase.id.toString(),
				title: useCase.title,
				type: 'item',
			}));
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
		<div className="py-24 ">
			<div className=" ml-24 p-5 text-3xl font-bold ">
				Skills
				<Paper className="flex p-4 items-center w-full px-16 py-4 border-1 h-40 rounded-full shadow-none">
					<FuseSvgIcon
						color="action"
						size={20}
					>
						heroicons-solid:search
					</FuseSvgIcon>

					<Input
						placeholder="Search for skills"
						className="flex flex-1 px-8"
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
						className="px-0 mt-32"
					/>
				)
			}
		</div>
	);
}

export default landingPageSideBar;
