import ApiService from '../../../../utils/serverless/ApiService';
import { EncodedParams } from '../../../../types/serverless';
import { SegmentTrackData } from '../../types/Segment/SegmentTrackData';
import { SegmentTraits } from '../../types/Segment/SegmentTraits';
import { EventResponse } from '../../types/Segment/EventResponse';

class SegmentService extends ApiService {
  traits: SegmentTraits | null = null;
  events: EventResponse[] = [];

  getTraitsForUser = async (userId: string): Promise<SegmentTraits> => {
    return new Promise((resolve, reject) => {
      if (this.traits) {
        resolve(this.traits);
        return;
      }

      const encodedParams: EncodedParams = {
        Token: encodeURIComponent(this.manager.store.getState().flex.session.ssoTokenPayload.token),
      };

      this.fetchJsonWithReject<SegmentTraits>(
        `${this.serverlessProtocol}://${this.serverlessDomain}/features/segment/get-traits`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-twilio-flex-token': encodeURIComponent(this.manager.store.getState().flex.session.ssoTokenPayload.token),
          },
          body: JSON.stringify({
            userId: userId,
          }),
        },
      )
        .then((response) => {
          this.traits = response;
          resolve(response);
        })
        .catch((error) => {
          console.error(`Error fetching traits for user\r\n`, error);
          reject(error);
        });
    });
  };

  getEventsForUser = async (userId: string): Promise<EventResponse[]> => {
    return new Promise((resolve, reject) => {
      if (this.traits) {
        resolve(this.events);
        return;
      }

      const encodedParams: EncodedParams = {
        Token: encodeURIComponent(this.manager.store.getState().flex.session.ssoTokenPayload.token),
      };

      this.fetchJsonWithReject<EventResponse[]>(
        `${this.serverlessProtocol}://${this.serverlessDomain}/features/segment/get-events`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-twilio-flex-token': encodeURIComponent(this.manager.store.getState().flex.session.ssoTokenPayload.token),
          },
          body: JSON.stringify({
            userId: userId,
          }),
        },
      )
        .then((response) => {
          this.events = response;
          resolve(response);
        })
        .catch((error) => {
          console.error(`Error fetching segment events for user\r\n`, error);
          reject(error);
        });
    });
  };

  sendToSegment = async (data: SegmentTrackData): Promise<any> => {
    return new Promise((resolve, reject) => {
      const encodedParams: EncodedParams = {
        Token: encodeURIComponent(this.manager.store.getState().flex.session.ssoTokenPayload.token),
      };

      this.fetchJsonWithReject<EventResponse[]>(
        `${this.serverlessProtocol}://${this.serverlessDomain}/features/segment/send-events`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-twilio-flex-token': encodeURIComponent(this.manager.store.getState().flex.session.ssoTokenPayload.token),
          },
          body: JSON.stringify(data),
        },
      )
        .then((response) => {
          this.events = response;
          resolve(response);
        })
        .catch((error) => {
          console.error(`Error sending Segment events\r\n`, error);
          reject(error);
        });
    });
  };
}

export default new SegmentService();
