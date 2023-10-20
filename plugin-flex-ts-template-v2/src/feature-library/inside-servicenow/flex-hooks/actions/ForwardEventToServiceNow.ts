import * as Flex from '@twilio/flex-ui';
import SnowService from '../../utils/SnowService/SnowService';

export const actionEvent = 'ForwardEventTo';
export const actionName = 'ServiceNow';

export const actionHook = function handleBeforeAcceptTask(flex: typeof Flex, manager: Flex.Manager) {
  flex.Actions.registerAction(`${actionEvent}${actionName}`, async (payload) => {
    let data = {
      worker: payload.task.source._worker.attributes,
      task: {
        sid: payload.task.sid,
        attributes: payload.task.attributes,
      },
      eventType: payload.eventType,
    };

    // Make a request to our function to pop or close the appropriate UI in ServiceNow
    SnowService.sendTaskEvent(data)
      .then((resp) => {
        console.log('////////////////////////////');
        console.log(payload.eventType);
        console.log(resp);
        console.log('////////////////////////////');
      })
      .catch((error) => {
        console.log(error);
        //throw error;
      });
  });
};
