import FuseNavigation from '@fuse/core/FuseNavigation';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import {ChangeEvent} from "react";
import {selectSearchText, setSearchText} from "../recommendationBox/recommendationAppSlice";
import InputAdornment from "@mui/material/InputAdornment";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {OutlinedInput} from "@mui/material";
import {useAppDispatch, useAppSelector} from "app/store/hooks";
import Typography from "@mui/material/Typography";


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
                title: 'Demand Forecasting Summary',
                type: 'item',
                url: ''
            },
            {
                id: '3.2',
                title: 'Product Schedule',
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
                title: 'Supply and Demand Planner',
                type: 'item'
            },
            {
                id: '3.2',
                title: 'Demand Forecast',
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
                title: 'Transportation Lanes',
                type: 'item',
            },
            {
                id: '3.2',
                title: 'Forecast Collaboration',
                type: 'item',
            }
        ]
    }
];


const convertToNavigationData = (useCases) => {
    return useCases.map((useCase, index) => ({
        id: (index + 1).toString(),
        title: useCase.name,
        type: 'group',
        children: useCase.data.map(item => ({
            id: item.id,
            title:`${item.title} - ${useCase.count}`,
            type: 'item'
        }))
    }));
};

const navigationData: FuseNavItemType[] = convertToNavigationData(useCases);


/**
 * The RecommendationPageSideBar component.
 */
function RecommendationPageSideBar({ onItemClick }) {
    const dispatch = useAppDispatch()
    const searchText = useAppSelector(selectSearchText);



    const handleItemClick = (item) => {
        onItemClick(item);
    };



    return (
        <div className="py-24 w-full h-full flex justify-center items-center">
            <div
                 className="card hover:scale-105 w-full hover:filter transition duration-300 ease-in-out hover relative cursor-pointer flex lg:flex-col md:flex-row sm:flex-row  shadow-2xl bg-white gap-10 rounded-2xl mb-32 m-6 overflow-hidden">
                <div className="flex w-full items-center text-blue-500 justify-between px-8 pt-12">
                    <Typography
                        className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
                    >
                        {'useCase.name'}
                    </Typography>
                </div>
                <div className="flex justify-between gap-10 flex-col">
                    <div
                        className="text-md font-medium md:mr-24  md:ml-24  line-clamp-2">{'useCase.description'}</div>
                    <Typography
                        className="text-lg md:pr-24 md:pl-24 md:pb-24 font-medium flex flex-col pt-20 tracking-tight leading-6 truncate"
                        color="text.secondary"
                    >
                        <span className="truncate"></span><b
                        className="px-8 text-blue-500">{String(34)}</b>
                        <span className="truncate"></span>{'Open'}<b className="px-8"></b>
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default RecommendationPageSideBar;
