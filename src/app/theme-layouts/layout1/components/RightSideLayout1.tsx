import { lazy, memo, Suspense } from 'react';

const QuickPanel = lazy(() => import('app/theme-layouts/shared-components/quickPanel/QuickPanel'));
const NotificationPanel = lazy(() => import('src/app/shared-components/notifications/NotificationPanel'));


/**
 * The right side layout 1.
 */
function RightSideLayout1() {
	return (
		<Suspense>
			<QuickPanel />
			<NotificationPanel />
		</Suspense>
	);
}

export default memo(RightSideLayout1);
