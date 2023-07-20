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
  From?: string;
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
      const phone = encodeURIComponent(event.From || '').toLowerCase();
      const url = `${context.SEGMENT_BASE_URL}/spaces/${context.SEGMENT_SPACE_ID}/collections/users/profiles/phone:${phone}/traits?limit=200`;
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
      if (!segmentPayload || !segmentPayload.hasOwnProperty('traits')) {
        response.setBody([]);
        callback(null, response);
        return;
      }

      response.setBody(segmentPayload.traits as object);
      return callback(null, response);
    } catch (error) {
      return handleError(error);
    }
  },
);
