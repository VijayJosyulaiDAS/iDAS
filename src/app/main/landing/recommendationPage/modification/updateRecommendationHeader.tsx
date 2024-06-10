import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

function RecommendationPageHeader(props) {
    const {selectedData} = props
    console.log(selectedData)

    return (
        <div className="flex flex-col p-24 w-full sm:py-32 sm:px-40">
            <div className="flex space-y-12 sm:space-y-0 flex-1 w-full items-center justify-between py-8 sm:py-16 px-16 md:px-24">
                <Typography
                    component="h2"
                    className="flex-1 text-3xl md:text-4xl font-extrabold tracking-tight leading-7 sm:leading-10 truncate mx-10"
                >
                    Modify Recommendation
                </Typography>
                {
                    selectedData &&
                    <div className="flex flex-1 items-center justify-end space-x-8">
                        <div
                            className="flex flex-grow-0"
                        >
                            <Button
                                className=""
                                variant="contained"
                                color="secondary"
                            >
                                <FuseSvgIcon size={20}>heroicons-outline:check-circle</FuseSvgIcon>
                                <span className="mx-4 sm:mx-8">Confirm Adjustment</span>
                            </Button>
                        </div>
                    </div>
                }
            </div>
        </div>

    )
}

export default RecommendationPageHeader;