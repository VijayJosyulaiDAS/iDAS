import { styled } from '@mui/material/styles';
import { useRef} from "react";
import PoContent from "./poContent";
import PoHeader from "./poHeader";
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
function PoPage() {
    const pageLayout = useRef(null);

    return (
        <Root
            header={
                <PoHeader/>
            }
            ref={pageLayout}
            content={<PoContent />}
            scroll="content"
        />
    );
}

export default PoPage;
