import Example from "./detail/detail";


const LandingConfig = {
    settings: {
        layout: {}
    },
    routes: [
        {
            path: 'detail',
            element: <Example/>
        }
    ]
};

export default LandingConfig;