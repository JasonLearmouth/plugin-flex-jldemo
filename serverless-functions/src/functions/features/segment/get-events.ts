// Imports global types
import '@twilio-labs/serverless-runtime-types';
// Fetches specific types
import {
  Context,
  ServerlessCallback,
  ServerlessEventObject,
  TwilioResponse,
} from '@twilio-labs/serverless-runtime-types/types';

import fetch from 'node-fetch';

const { prepareFlexFunction } = require(Runtime.getFunctions()['common/helpers/function-helper'].path);
const requiredParameters = ['userId'];

type MyEvent = {
  userId?: string;
};

export type EventResponse = {
  timestamp: Date;
  title: string;
  url: string;
  event: string;
  userAgent: string;
};

export type MyContext = {
  SEGMENT_SPACE_ID?: string;
  SEGMENT_BASE_URL?: string;
  SEGMENT_API_ACCESS_TOKEN?: string;
};

exports.handler = prepareFlexFunction(
  requiredParameters,
  async (
    context: Context<MyContext>,
    event: ServerlessEventObject<MyEvent>,
    callback: ServerlessCallback,
    response: TwilioResponse,
    handleError: (err: any) => void,
  ) => {
    try {
      let token = Buffer.from(`${context.SEGMENT_API_ACCESS_TOKEN}:`, 'utf8').toString('base64');
      const email = encodeURIComponent(event.userId || '').toLowerCase();
      const url = `${context.SEGMENT_BASE_URL}/spaces/${context.SEGMENT_SPACE_ID}/collections/users/profiles/email:${email}/events?limit=100`;
      console.log(`Fetching segment Event Data from: ${url}`);

      var options: any = {
        method: 'GET',
        headers: {
          Authorization: `Basic ${token}`,
        },
      };

      const result = await fetch(url, options);
      const segmentPayload = await result.json();

      // console.log(JSON.stringify(segmentPayload, null, 2));

      // Guard clause
      if (!segmentPayload || !segmentPayload.data || segmentPayload.data.length <= 0) {
        response.setBody([]);
        callback(null, response);
        return;
      }

      const responseData: EventResponse[] = [];

      segmentPayload.data.map((e: any) => {
        // console.log(JSON.stringify(e, null, 2));
        responseData.push({
          timestamp: e.timestamp,
          event: e.event,
          title: e?.properties?.title || e.event || 'No title',
          url: e?.context?.page?.url,
          userAgent: e.context.userAgent,
        });
      });

      response.setBody(responseData);
      return callback(null, response);
    } catch (error) {
      return handleError(error);
    }
  },
);
