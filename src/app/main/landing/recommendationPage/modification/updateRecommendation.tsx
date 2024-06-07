import { styled } from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';
import RecommendationPageHeader from './updateRecommendationHeader';
import UpdateRecommendationContent from "./updateRecommendationContent";
import {useParams} from "react-router-dom";

const Root = styled(FusePageCarded)(() => ({
    '& .FusePageCarded-header': {},
    '& .FusePageCarded-toolbar': {},
    '& .FusePageCarded-content': {},
    '& .FusePageCarded-sidebarHeader': {},
    '& .FusePageCarded-sidebarContent': {}
}));

/**
 * UpdateRecommendationPage.
 */
function UpdateRecommendation() {

    return (
        <Root
            header={
                <RecommendationPageHeader/>
            }
            content={<UpdateRecommendationContent />}
            scroll="content"
        />
    );
}

export default UpdateRecommendation;
