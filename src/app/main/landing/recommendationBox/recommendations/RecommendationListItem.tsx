import _ from '@lodash';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useAppSelector } from 'app/store/hooks';
import withRouter from '@fuse/core/withRouter';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import format from 'date-fns/format';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import { NavLinkAdapterPropsType } from '@fuse/core/NavLinkAdapter/NavLinkAdapter';
import {selectRecommendationMailIds} from '../recommendationAppSlice';

const StyledListItem = styled(ListItemButton)<ListItemButtonProps & NavLinkAdapterPropsType & { unread: number }>(
	({ theme, unread }) => ({
		background: theme.palette.background.default,
		borderBottom: `1px solid ${theme.palette.divider}`,

		...(unread && {
			background: theme.palette.background.paper
		}),

		'&.selected': {
			'&::after': {
				content: '""',
				position: 'absolute',
				top: 0,
				left: 0,
				display: 'block',
				height: '100%',
				width: 3,
				backgroundColor: theme.palette.primary.main
			}
		}
	})
);


/**
 * The mail list item.
 */
function RecommendationListItem(props) {
	const selectedRecommendationIds = useAppSelector(selectRecommendationMailIds);

	const { recommendation } = props;
	const checked = selectedRecommendationIds.length > 0 && selectedRecommendationIds.find((id) => id === recommendation.id) !== undefined;

	return (
		<StyledListItem
			component={NavLinkAdapter}
			activeClassName="selected"
			to={recommendation.id}
			dense
			selected={checked}
			unread={recommendation.unread ? 1 : 0}
			className="items-start py-20 px-0 md:px-8 relative w-full p-20"
		>

			<div className="flex flex-col flex-auto min-w-0">
				<div className="flex w-full space-x-6 items-center">
					<Avatar
						sx={{
							backgroundColor: (_theme) => _theme.palette.primary.main
						}}
						alt={recommendation.from.email}
						src={recommendation.from?.avatar}
					>
						{recommendation.from.contact}
					</Avatar>
					<div className="flex flex-col w-full min-w-0">
						<div className="flex items-center w-full">
							<Typography className="mr-8 font-semibold truncate">
								{recommendation.from.contact.split('<')[0].trim()}
							</Typography>

							{recommendation.important && (
								<span
									className="mr-12 text-blue-500 dark:text-red-600"
								>
									New
								</span>
							)}

							<Typography
								className="ml-auto text-md text-right whitespace-nowrap"
								color="text.secondary"
							>
								{format(new Date(recommendation.date), 'LLL dd')}
							</Typography>
						</div>
					</div>
				</div>
				<Typography
					color="text.secondary"
					className="mt-8 leading-normal line-clamp-2"
				>
					{_.truncate(recommendation.content.replace(/<(?:.|\n)*?>/gm, ''), { length: 180 })}
				</Typography>
			</div>
		</StyledListItem>
	);
}

export default withRouter(RecommendationListItem);
