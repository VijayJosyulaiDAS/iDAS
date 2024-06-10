import React from "react";
import Typography from "@mui/material/Typography";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {useNavigate} from "react-router-dom";

function RecommendationPageHeader() {
    const savedData = localStorage.getItem('recommendationData');
    const [recommendation, setData] = React.useState<any>(JSON.parse(savedData));
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/apps/landing/${recommendation.use_case_id}`)
    }

    return (
        <div className="flex flex-col p-24 w-full sm:py-32 sm:px-40">
            <div className="flex items-center w-full mt-8 -mx-10">
                <FuseSvgIcon onClick={handleClick} size={28} className='text-blue-500 cursor-pointer'>heroicons-outline:arrow-narrow-left</FuseSvgIcon>
                <Typography
                    component="h2"
                    className="flex-1 text-3xl md:text-4xl font-extrabold tracking-tight leading-7 sm:leading-10 truncate mx-10"
                >
                    Recommendation
                </Typography>
            </div>
        </div>

    )
}

export default RecommendationPageHeader;