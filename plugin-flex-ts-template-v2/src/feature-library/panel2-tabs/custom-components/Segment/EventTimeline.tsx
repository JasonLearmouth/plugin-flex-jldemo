import {
  ProgressSteps,
  ProgressStepComplete,
  ProgressStepSeparator,
  ProgressStepCurrent,
} from '@twilio-paste/progress-steps';

import React from 'react';
import Moment from 'react-moment';
import { EventResponse } from '../../types/Segment/EventResponse';
import { Box, SkeletonLoader, Stack } from '@twilio-paste/core';

type EventTimelineProps = {
  events: EventResponse[];
  loading: boolean;
};

const EventTimeline = ({ events, loading }: EventTimelineProps) => {
  if (loading)
    return (
      <Stack orientation={'vertical'} spacing={'space70'}>
        <SkeletonLoader key={1} />
        <SkeletonLoader key={2} />
        <SkeletonLoader key={3} />
      </Stack>
    );

  if (!events || events.length === 0) return <>No CDP events</>;

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

  const timelineItems = events.map((event: EventResponse, idx: number) => {
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

export default EventTimeline;
