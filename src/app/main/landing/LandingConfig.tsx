import Home from "./initialPage/home";
import LandingPage from "./landingPage/landingPage";
import {Navigate} from "react-router-dom";
import SelectRecommendationMessage from "./recommendationBox/SelectRecommendationMessage";
import MailDetails from "./recommendationBox/recommendation/RecommendationDetails";
import LandingPageContent from "./landingPage/landingPageContent";
import RecommendationList from "./recommendationBox/recommendations/RecommendationList";
import RecommendationDetail from "./recommendationPage/recommendationDetail";
import UpdateRecommendation from "./recommendationPage/modification/updateRecommendation";
import BomPage from "./source/bomPage/bomPage";
import M1Page from "./source/m1Page/m1Page";
import ProductionPage from "./source/productionPage/productionPage";
import MrpPage from "./source/mrpPage/mrpPage";
import PoPage from "./source/posPage/poPage";


const LandingConfig = {
    settings: {
        layout: {}
    },
    routes: [
        {
            path: 'home',
            element: <Home/>
        }, {
            path: '/apps/landing',
            children: [
                {
                    path: '',
                    element: <LandingPage/>
                },{
                    path: ':folderHandle',
                    element: <LandingPage/>
                }
            ]
        },{
        path: '/apps/recommendations',
        children: [
            {
                path: '',
                element: <RecommendationDetail/>,
            },{
                path: '/apps/recommendations/:recommendationId',
                element: <UpdateRecommendation/>,
            },
        ]
        },{
        path: '/apps/recommendations/update',
        element: <UpdateRecommendation/>
        },{
        path: '/apps/source/bom',
        element: <BomPage/>
        },
        {
        path: '/apps/source/m-1',
        element: <M1Page/>
        },
        {
        path: '/apps/source/production',
        element: <ProductionPage/>
        },
        {
        path: '/apps/source/mrp',
        element: <MrpPage/>
        },
        {
        path: '/apps/source/pos',
        element: <PoPage/>
        }
    ]
};

export default LandingConfig;