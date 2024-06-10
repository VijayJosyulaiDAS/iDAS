import { styled } from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';
import RecommendationPageHeader from './updateRecommendationHeader';
import UpdateRecommendationContent from "./updateRecommendationContent";
import {useParams} from "react-router-dom";
import {useState} from "react";

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
    const [selectedRow, setSelectedRow] = useState(null);

    return (
        <Root
            header={
                <RecommendationPageHeader selectedData={selectedRow}/>
            }
            content={<UpdateRecommendationContent setSelectedRow={setSelectedRow}  />}
            scroll="content"
        />
    );
}

export default UpdateRecommendation;
