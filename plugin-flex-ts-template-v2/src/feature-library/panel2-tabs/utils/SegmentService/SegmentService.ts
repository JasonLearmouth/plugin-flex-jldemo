import ApiService from '../../../../utils/serverless/ApiService';
import { EncodedParams } from '../../../../types/serverless';
import { SegmentTrackData } from '../../types/Segment/SegmentTrackData';
import { SegmentTraits } from '../../types/Segment/SegmentTraits';
import { EventResponse } from '../../types/Segment/EventResponse';

class SegmentService extends ApiService {
  userTraitsCache: Record<string, SegmentTraits> = {};
  userEventsCache: Record<string, EventResponse[]> = {};

  getTraitsForUser = async (userId: string): Promise<SegmentTraits> => {
    return new Promise((resolve, reject) => {
      if (this.userTraitsCache[userId]) {
        resolve(this.userTraitsCache[userId]);
        return;
      }

      const encodedParams: EncodedParams = {
        Token: encodeURIComponent(this.manager.store.getState().flex.session.ssoTokenPayload.token),
      };

      this.fetchJsonWithReject<SegmentTraits>(
        `${this.serverlessProtocol}://${this.serverlessDomain}/features/segment/get-traits?` +
          new URLSearchParams({ userId: userId }),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then((response) => {
          this.userTraitsCache[userId] = response;
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
      if (this.userEventsCache[userId]) {
        resolve(this.userEventsCache[userId]);
        return;
      }

      const encodedParams: EncodedParams = {
        Token: encodeURIComponent(this.manager.store.getState().flex.session.ssoTokenPayload.token),
      };

      this.fetchJsonWithReject<EventResponse[]>(
        `${this.serverlessProtocol}://${this.serverlessDomain}/features/segment/get-events?` +
          new URLSearchParams({ userId: userId }),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then((response) => {
          this.userEventsCache[userId] = response;
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
          },
          body: JSON.stringify(data),
        },
      )
        .then((response) => {
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
