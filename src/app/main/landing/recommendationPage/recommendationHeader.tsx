import React from "react";
import Typography from "@mui/material/Typography";

function RecommendationPageHeader() {

    return (
        <div className="flex flex-col p-24 w-full sm:py-32 sm:px-40">
            <div className="flex items-center w-full mt-8 -mx-10">
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