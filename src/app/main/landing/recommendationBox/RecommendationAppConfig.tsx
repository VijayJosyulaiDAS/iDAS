import i18next from 'i18next';
import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import ar from './i18n/ar';
import en from './i18n/en';
import tr from './i18n/tr';
import SelectRecommendationMessage from './SelectRecommendationMessage';
import MailDetails from './recommendation/RecommendationDetails';

const MailboxApp = lazy(() => import('./RecommendationApp'));

i18next.addResourceBundle('en', 'mailboxApp', en);
i18next.addResourceBundle('tr', 'mailboxApp', tr);
i18next.addResourceBundle('ar', 'mailboxApp', ar);

/**
 * The mailbox app config.
 */
const RecommendationAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps',
			children: [
				{
					path: '',
					element: <Navigate to="/apps/recommendations" />
				},
				{
					path: ':folderHandle',
					element: <MailboxApp />,

					children: [
						{ path: '', element: <SelectRecommendationMessage /> },
						{ path: ':mailId', element: <MailDetails /> }
					]
				},
				{
					path: 'label/:labelHandle',
					element: <MailboxApp />,

					children: [
						{ path: '', element: <SelectRecommendationMessage /> },
						{ path: ':mailId', element: <MailDetails /> }
					]
				},
				{
					path: 'filter/:filterHandle',
					element: <MailboxApp />,

					children: [
						{ path: '', element: <SelectRecommendationMessage /> },
						{ path: ':mailId', element: <MailDetails /> }
					]
				}
			]
		}
	]
};

export default RecommendationAppConfig;
