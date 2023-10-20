import ApiService from '../../../../utils/serverless/ApiService';
import { EncodedParams } from '../../../../types/serverless';
import { TaskEventResponse } from '../../types/SnowService/TaskEventResponse';
import { TaskEventData } from '../../types/SnowService/TaskEventData';

class SnowService extends ApiService {
  sendTaskEvent = async (data: TaskEventData): Promise<any> => {
    return new Promise((resolve, reject) => {
      const encodedParams: EncodedParams = {
        Token: encodeURIComponent(this.manager.store.getState().flex.session.ssoTokenPayload.token),
      };

      this.fetchJsonWithReject<TaskEventResponse>(
        `${this.serverlessProtocol}://${this.serverlessDomain}/features/inside-servicenow/task_event`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.error(`Error sending data to SNOW\r\n`, error);
          reject(error);
        });
    });
  };
}

export default new SnowService();
