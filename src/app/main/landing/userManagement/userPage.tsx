import { styled } from '@mui/material/styles';
import { useRef} from "react";
import FusePageSimple from "@fuse/core/FusePageSimple";
import UserHeader from "./userHeader";
import UserContent from "./userContent";

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
    },
    '& .FusePageSimple-content': {},
    '& .FusePageSimple-sidebarHeader': {},
    '& .FusePageSimple-sidebarContent': {}
}));

/**
 * UsersPage.
 */
function UserPage() {
    const pageLayout = useRef(null);

    return (
        <Root
            header={
                <UserHeader/>
            }
            ref={pageLayout}
            content={<UserContent />}
            scroll="content"
        />
    );
}

export default UserPage;
