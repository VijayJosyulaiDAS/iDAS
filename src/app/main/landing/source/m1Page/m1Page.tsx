import { styled } from '@mui/material/styles';
import { useRef} from "react";
import M1Content from "./m1Content";
import M1Header from "./m1Header";
import FusePageSimple from "@fuse/core/FusePageSimple";

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
    },
    '& .FusePageSimple-content': {},
    '& .FusePageSimple-sidebarHeader': {},
    '& .FusePageSimple-sidebarContent': {}
}));

/**
 * RecommendationDetailPage.
 */
function M1Page() {
    const pageLayout = useRef(null);

    return (
        <Root
            header={
                <M1Header/>
            }
            ref={pageLayout}
            content={<M1Content />}
            scroll="content"
        />
    );
}

export default M1Page;
