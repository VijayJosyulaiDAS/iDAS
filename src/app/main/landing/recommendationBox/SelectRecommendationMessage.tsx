import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

/**
 * The select mail message.
 */
function SelectRecommendationMessage() {
	return (
		<div className="flex flex-col flex-1 items-center justify-center p-24">
			<FuseSvgIcon
				className="icon-size-128 mb-16"
				color="disabled"
				size={24}
			>
				material-solid:settings_suggest
			</FuseSvgIcon>
			<Typography
				className="mt-16 text-2xl font-semibold tracking-tight"
				color="text.secondary"
			>
				Select a recommendation to see
			</Typography>
		</div>
	);
}

export default SelectRecommendationMessage;
