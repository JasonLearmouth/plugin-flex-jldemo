import {
  ProgressSteps,
  ProgressStepComplete,
  ProgressStepSeparator,
  ProgressStepCurrent,
} from '@twilio-paste/progress-steps';

import React, { useEffect, useState } from 'react';

import SegmentService from '../../utils/SegmentService/SegmentService';
import Moment from 'react-moment';
import { EventResponse } from '../../types/Segment/EventResponse';
import { Box, SkeletonLoader, Stack } from '@twilio-paste/core';
import { withTaskContext } from '@twilio/flex-ui';

type Props = {
  task?: any;
};

const EventTimeline = (props: Props) => {
  const [segmentEvents, setSegmentEvents] = useState<EventResponse[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('EventTimeline props', props.task.attributes);

    async function getEvents() {
      if (props.task?.attributes?.email) {
        const eventsObj = await SegmentService.getEventsForUser(props.task.attributes.email);
        setSegmentEvents(eventsObj);
      }

      setLoading(false);
    }
    getEvents();
  }, [props?.task?.attributes?.email]);

  if (loading)
    return (
      <Stack orientation={'vertical'} spacing={'space70'}>
        <SkeletonLoader key={1} />
        <SkeletonLoader key={2} />
        <SkeletonLoader key={3} />
      </Stack>
    );
  if (!segmentEvents) return <>No CDP events</>;

  const timelineItem = (e: EventResponse) => {
    if (e.url)
      return (
        <ProgressStepCurrent as="a" href={e.url}>
          <Moment fromNow>{e.timestamp}</Moment>
          {' - '}
          {e.title}
        </ProgressStepCurrent>
      );

    return (
      <ProgressStepComplete as="div">
        <Moment fromNow>{e.timestamp}</Moment>
        {' - '}
        {e.title}
      </ProgressStepComplete>
    );
  };

  const timelineItems = segmentEvents.map((event: EventResponse, idx: number) => {
    return (
      <div key={idx}>
        <ProgressStepSeparator key={`sep-${idx}`} />
        {timelineItem(event)}
      </div>
    );
  });

  return (
    <Box overflow={'scroll'} height={'70vh'}>
      <ProgressSteps orientation="vertical">{timelineItems}</ProgressSteps>
    </Box>
  );
};

export default withTaskContext(EventTimeline);
