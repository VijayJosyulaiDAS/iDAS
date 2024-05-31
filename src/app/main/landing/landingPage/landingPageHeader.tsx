import React from "react";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";


type LandingPageHeaderProps = {
    leftSidebarToggle?: () => void;
    rightSidebarToggle?: () => void;
};

function landingPageHeader(props: LandingPageHeaderProps) {

    const { leftSidebarToggle, rightSidebarToggle } = props;

    function handleClick() {}

    return (
        <div className="flex flex-col p-24 w-full sm:py-32 sm:px-40">
            <div className="flex items-center w-full mt-8 -mx-10">
                {leftSidebarToggle && (
                    <div className="flex shrink-0 items-center">
                        <IconButton
                            onClick={leftSidebarToggle}
                            aria-label="toggle sidebar"
                        >
                            <FuseSvgIcon>heroicons-outline:menu</FuseSvgIcon>
                        </IconButton>
                    </div>
                )}
                <Typography
                    component="h2"
                    className="flex-1 text-3xl md:text-4xl font-extrabold tracking-tight leading-7 sm:leading-10 truncate mx-10"
                >
                    Recommendation
                </Typography>
                {rightSidebarToggle && (
                    <div className="flex shrink-0 items-center">
                        <IconButton
                            onClick={rightSidebarToggle}
                            aria-label="toggle sidebar"
                        >
                            <FuseSvgIcon>heroicons-outline:menu</FuseSvgIcon>
                        </IconButton>
                    </div>
                )}
            </div>
        </div>

    )
}

export default landingPageHeader;