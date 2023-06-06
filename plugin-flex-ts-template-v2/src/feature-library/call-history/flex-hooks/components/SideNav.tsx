import * as Flex from '@twilio/flex-ui';

import { FlexComponent } from '../../../../types/feature-loader';
import { isFeatureEnabled } from '../../config';
import CallHistorySideNav from '../../custom-components/CallHistorySideNav/CallHistorySideNav';

export const componentName = FlexComponent.SideNav;
export const componentHook = function addCallHistoryToSideNav(flex: typeof Flex, manager: Flex.Manager) {
  if (!isFeatureEnabled()) {
    return;
  }

  // Add side nav button for the view
  flex.SideNav.Content.add(<CallHistorySideNav viewName="call-history" key="call-history-side-nav" />);
};