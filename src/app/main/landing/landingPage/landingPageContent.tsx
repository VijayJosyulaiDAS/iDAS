import { useParams } from 'react-router-dom';


/**
 * LandingPage Content
 */
function LandingPageContent(props) {
    const {selectedData} = props
    console.log(selectedData)

    return (
        <div className="flex-auto p-24 sm:p-40">
            <div className="h-7xl min-h-7xl max-h-7xl border-2 border-dashed rounded-2xl" />
        </div>
    );
}

export default LandingPageContent;
