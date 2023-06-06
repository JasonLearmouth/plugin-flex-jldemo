import * as Flex from '@twilio/flex-ui';

import { FlexActionEvent, FlexAction } from '../../../../types/feature-loader';
import recentCalls from '../../utils/RecentCalls';
import { Task } from '../../../../types/task-router';

export const actionEvent = FlexActionEvent.before;
export const actionName = FlexAction.CompleteTask;

export const actionHook = function callHistoryCompleteTask(
  flex: typeof Flex,
  _manager: Flex.Manager
) {
  flex.Actions.addListener(
    `${actionEvent}${actionName}`,
    async (payload: { task: Task }, _abortFunction) => {
      console.log('RecentCalls feature - adding item for:', payload);
      recentCalls.addCall(payload.task);
    }
  );
};
