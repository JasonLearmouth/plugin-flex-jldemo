import * as Flex from '@twilio/flex-ui';

import { FlexComponent } from '../../../../types/feature-loader';
import { isFeatureEnabled } from '../../config';
import CallHistory from '../../custom-components/CallHistoryView/CallHistoryView';
export const componentName = FlexComponent.ViewCollection;
export const componentHook = function addCallHistoryView(flex: typeof Flex, manager: Flex.Manager) {
  if (!isFeatureEnabled()) {
    return;
  }

  // Add view
  flex.ViewCollection.Content.add(
    <flex.View name="call-history" key="call-history-view">
      <CallHistory key="call-history-view-content" />
    </flex.View>,
  );
};