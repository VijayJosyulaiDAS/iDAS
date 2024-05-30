import RecommendationToolbar from './RecommendationsToolbar';
import RecommendationList from "./RecommendationList";

type MailsProps = {
	onToggleLeftSidebar: () => void;
};

function Recommendations(props: MailsProps) {
	const { onToggleLeftSidebar } = props;

	return (
		<div className="flex flex-col w-full min-h-full">
			<RecommendationToolbar onToggleLeftSidebar={onToggleLeftSidebar} />
			<RecommendationList />
		</div>
	);
}

export default Recommendations;
