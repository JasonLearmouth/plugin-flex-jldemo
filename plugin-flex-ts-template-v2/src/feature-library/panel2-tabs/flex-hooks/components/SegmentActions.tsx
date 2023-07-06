// import * as Flex from '@twilio/flex-ui';

// import { FlexComponent } from '../../../../types/feature-loader';
// import { WorkerAcceptTaskActionPayload } from '@twilio/flex-ui/src/actions/WorkerActions';
// import SegmentService from '../../utils/SegmentService/SegmentService';

// export const componentName = FlexComponent.CRMContainer;
// export const componentHook = function addSegmentActions(flex: typeof Flex, _manager: Flex.Manager) {
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

//   flex.Actions.addListener('beforeCompleteTask', async (payload: WorkerAcceptTaskActionPayload) => {
//     if (payload.task?.attributes.email) {
//       await SegmentService.sendToSegment({
//         actor: 'Flex',
//         eventName: 'Agent Complete',
//         userId: payload.task?.attributes.email,
//         ConversationSid: payload.task?.attributes.conversationSid,
//         direction: payload.task?.attributes.direction,
//         channelType: payload.task?.attributes.channelType,
//       });
//     }
//   });
// };
