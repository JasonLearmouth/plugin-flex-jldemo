import * as Flex from '@twilio/flex-ui';

import { FlexComponent } from '../../../../types/feature-loader';
import { WorkerAcceptTaskActionPayload } from '@twilio/flex-ui/src/actions/WorkerActions';
import SegmentService from '../../utils/SegmentService/SegmentService';
import PushSummary from 'feature-library/panel2-tabs/utils/PushSummary';

export const componentName = FlexComponent.CRMContainer;
export const componentHook = function addSegmentActions(flex: typeof Flex, _manager: Flex.Manager) {
  //   flex.Actions.addListener('beforeAcceptTask', async (payload: WorkerAcceptTaskActionPayload) => {
  //     if (payload.task?.attributes.email) {
  //       await SegmentService.sendToSegment({
  //         actor: 'Flex',
  //         eventName: 'Agent Accept',
  //         userId: payload.task?.attributes.email,
  //         ConversationSid: payload.task?.attributes.conversationSid,
  //         direction: payload.task?.attributes.direction,
  //         channelType: payload.task?.attributes.channelType,
  //       });
  //     }
  //   });

  flex.Actions.addListener('beforeCompleteTask', async (payload: WorkerAcceptTaskActionPayload) => {
    // if (payload.task?.attributes.email) {
    //   await SegmentService.sendToSegment({
    //     actor: 'Flex',
    //     eventName: 'Agent Complete',
    //     userId: payload.task?.attributes.email,
    //     ConversationSid: payload.task?.attributes.conversationSid,
    //     direction: payload.task?.attributes.direction,
    //     channelType: payload.task?.attributes.channelType,
    //   });
    // }
    // ***BROKEN - NOT YET COMPLETED CODING
    // try {
    //     if (!payload.task?.attributes.customer?.id || !payload.task?.attributes.customer?.email || !summaryRaw) {
    //       throw new Error('Missing properties');
    //     }
    //     const summary = typeof summaryRaw === 'string' ? summaryRaw?.replace(/^\n+/, '') : summaryRaw;
    //     await PushSummary.push(
    //         payload.task?.attributes.customer?.id as string,
    //         payload.task?.attributes.customer?.email as string,
    //         summary,
    //       sentiment?.sentiment as string,
    //       payload.task?.attributes.currentLanguage,
    //     );
    //   } catch (error: any) {
    //     const err = error.message;
    //     console.error(err);
    //   }
  });
};
