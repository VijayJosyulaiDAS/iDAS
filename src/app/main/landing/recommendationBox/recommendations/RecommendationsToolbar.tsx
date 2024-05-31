import IconButton from '@mui/material/IconButton';
import { ChangeEvent} from 'react';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import InputAdornment from '@mui/material/InputAdornment';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { OutlinedInput } from '@mui/material';
import Hidden from '@mui/material/Hidden';
import {
	selectSearchText,
	setSearchText
} from '../recommendationAppSlice';

type MailToolbarProps = {
	onToggleLeftSidebar: () => void;
};

function MailToolbar(props: MailToolbarProps) {
	const { onToggleLeftSidebar } = props;
	const dispatch = useAppDispatch()


	const searchText = useAppSelector(selectSearchText);

	const { t } = useTranslation('mailboxApp');


	return (
		<div className="sticky top-0 z-10">
			<Box
				sx={{ backgroundColor: 'background.default' }}
				className="flex items-center w-full min-h-64 py-12 sm:py-0 space-x-8 px-8 border-b "
			>
				<div className="flex items-center">
					<Hidden lgUp>
						<IconButton
							onClick={() => onToggleLeftSidebar()}
							aria-label="open left sidebar"
							size="small"
						>
							<FuseSvgIcon>heroicons-outline:menu</FuseSvgIcon>
						</IconButton>
					</Hidden>

				</div>

				<OutlinedInput
					className="flex flex-1 items-center px-16 rounded-full"
					fullWidth
					placeholder={t('SEARCH_PLACEHOLDER')}
					value={searchText}
					onChange={(ev: ChangeEvent<HTMLInputElement>) => dispatch(setSearchText(ev))}
					startAdornment={
						<InputAdornment position="start">
							<FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>
						</InputAdornment>
					}
					inputProps={{
						'aria-label': 'Search'
					}}
					size="small"
				/>
			</Box>
		</div>
	);
}

export default MailToolbar;
