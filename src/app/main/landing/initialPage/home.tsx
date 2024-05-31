import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import React from 'react';
import Typography from "@mui/material/Typography";
import {useAppSelector} from "app/store/hooks";
import {selectUser} from "../../../auth/user/store/userSlice";
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import HomeHeader from "./homeHeader";
import HomeContent from "./homeContent";

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.palette.divider
    },
    '& .FusePageSimple-content': {},
    '& .FusePageSimple-sidebarHeader': {},
    '& .FusePageSimple-sidebarContent': {}
}));

function Home() {
    const user = useAppSelector(selectUser);
    function getFirstName(fullName) {
        const match = fullName.match(/[A-Z][a-z]*/);
        if (match) {
            return match[0];
        }
        return fullName;
    }
    const firstName = getFirstName(user.data.displayName)


    return (
        // <div className='w-full h-full flex flex-col'>
        //     <div className='flex sticky top-0'>
        //         <HomeHeader />
        //     </div>
        //     <div className='w-full h-full'>
        //         <HomeContent />
        //     </div>
        // </div>
        <div className='w-full h-full'>
            <HomeContent/>
        </div>
    );
}

export default Home;
