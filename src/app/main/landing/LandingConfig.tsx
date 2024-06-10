import Home from "./initialPage/home";
import LandingPage from "./landingPage/landingPage";
import {Navigate} from "react-router-dom";
import SelectRecommendationMessage from "./recommendationBox/SelectRecommendationMessage";
import MailDetails from "./recommendationBox/recommendation/RecommendationDetails";
import LandingPageContent from "./landingPage/landingPageContent";
import RecommendationList from "./recommendationBox/recommendations/RecommendationList";
import RecommendationDetail from "./recommendationPage/recommendationDetail";
import UpdateRecommendation from "./recommendationPage/modification/updateRecommendation";


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
        }
    ]
};

export default LandingConfig;