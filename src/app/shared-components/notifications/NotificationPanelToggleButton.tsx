import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'app/store/hooks';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { ReactNode } from 'react';
import { toggleNotificationPanel } from './notificationPanelSlice';

type NotificationPanelToggleButtonProps = {
	children?: ReactNode;
};

/**
 * The notification panel toggle button.
 */
function NotificationPanelToggleButton(props: NotificationPanelToggleButtonProps) {
	const { children = <FuseSvgIcon>heroicons-outline:bell</FuseSvgIcon> } = props;
	const notifications  = [
		{
			"id": "493190c9-5b61-4912-afe5-78c21f1044d7",
			"icon": "heroicons-solid:star",
			"title": "Daily challenges",
			"description": "Your submission has been accepted",
			"time": "2022-05-09T10:32:42.703Z",
			"read": false
		},
		{
			"id": "6e3e97e5-effc-4fb7-b730-52a151f0b641",
			"image": "assets/images/avatars/male-04.jpg",
			"description": "<strong>Leo Gill</strong> added you to <em>Top Secret Project</em> group and assigned you as a <em>Project Manager</em>",
			"time": "2022-05-09T10:07:42.703Z",
			"read": true,
			"link": "/dashboards/project",
			"useRouter": true
		},
		{
			"id": "b91ccb58-b06c-413b-b389-87010e03a120",
			"icon": "heroicons-solid:mail",
			"title": "Mailbox",
			"description": "You have 15 unread mails across 3 mailboxes",
			"time": "2022-05-09T07:57:42.703Z",
			"read": false,
			"link": "/apps/mailbox",
			"useRouter": true
		},
		{
			"id": "541416c9-84a7-408a-8d74-27a43c38d797",
			"icon": "heroicons-solid:refresh",
			"title": "Cron jobs",
			"description": "Your <em>Docker container</em> is ready to publish",
			"time": "2022-05-09T05:57:42.703Z",
			"read": false,
			"link": "/dashboards/project",
			"useRouter": true
		},
		{
			"id": "ef7b95a7-8e8b-4616-9619-130d9533add9",
			"image": "assets/images/avatars/male-06.jpg",
			"description": "<strong>Roger Murray</strong> accepted your friend request",
			"time": "2022-05-09T03:57:42.703Z",
			"read": true,
			"link": "/dashboards/project",
			"useRouter": true
		},
		{
			"id": "eb8aa470-635e-461d-88e1-23d9ea2a5665",
			"image": "assets/images/avatars/female-04.jpg",
			"description": "<strong>Sophie Stone</strong> sent you a direct message",
			"time": "2022-05-09T01:57:42.703Z",
			"read": true,
			"link": "/dashboards/project",
			"useRouter": true
		},
		{
			"id": "b85c2338-cc98-4140-bbf8-c226ce4e395e",
			"icon": "heroicons-solid:mail",
			"title": "Mailbox",
			"description": "You have 3 new mails",
			"time": "2022-05-08T10:57:42.703Z",
			"read": true,
			"link": "/apps/mailbox",
			"useRouter": true
		},
		{
			"id": "8f8e1bf9-4661-4939-9e43-390957b60f42",
			"icon": "heroicons-solid:star",
			"title": "Daily challenges",
			"description": "Your submission has been accepted and you are ready to sign-up for the final assigment which will be ready in 2 days",
			"time": "2022-05-06T10:57:42.703Z",
			"read": true,
			"link": "/dashboards/project",
			"useRouter": true
		},
		{
			"id": "30af917b-7a6a-45d1-822f-9e7ad7f8bf69",
			"icon": "heroicons-solid:refresh",
			"title": "Cron jobs",
			"description": "Your Vagrant container is ready to download",
			"time": "2022-05-05T10:57:42.703Z",
			"read": true,
			"link": "/apps/file-manager",
			"useRouter": true
		}
	]

	const dispatch = useAppDispatch();

	return (
		<IconButton
			className="h-40 w-40"
			onClick={() => dispatch(toggleNotificationPanel())}
			size="large"
		>
			<Badge
				color="secondary"
				variant="dot"
				invisible={notifications?.length === 0}
			>
				{children}
			</Badge>
		</IconButton>
	);
}

export default NotificationPanelToggleButton;
