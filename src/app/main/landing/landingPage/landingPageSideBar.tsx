import FuseNavigation from '@fuse/core/FuseNavigation';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import FuseLoading from "@fuse/core/FuseLoading";

/**
 * The LandingSidebar component.
 */
function landingPageSideBar(props) {

	const {data,onItemClick} = props
	const [useCases, setUseCases] = useState([])
	const [loading, setLoading] = useState<boolean>(false)

	const fetchUseCases = async () => {
		setLoading(true);
		let response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/get_useCases`)
		setUseCases(response.data.data)
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

	const navigationData: FuseNavItemType[] = convertToNavigationData(useCases);

	const handleItemClick = (item) => {
		onItemClick(item);
		console.log(item)
	};



	return (
		<div className="py-24 ">
			<div className=" ml-24 text-3xl font-bold ">
				Use Cases List
			</div>
			{
				loading ? (
					<FuseLoading></FuseLoading>
				) : (
					<FuseNavigation
						navigation={navigationData}
						onItemClick={handleItemClick}
						className="px-0 mt-32"
					/>
				)
			}
		</div>
	);
}

export default landingPageSideBar;
