import React from 'react';
import { Box, Card, Column, Grid, Heading, Paragraph, Stack } from '@twilio-paste/core';

import EventTimeline from './EventTimeline';
import FauxSuggestions from './FauxSuggestions';
import EngagementMetrics from './EngagementMetrics';
import TraitTags from './TraitTags';

const SegmentView = () => {
  return (
    <Box as="main" padding="space70">
      <Grid gutter="space30">
        <Column span={4}>
          <Stack orientation={'vertical'} spacing="space50">
            {/* <CustomerInfo /> */}

            <Card padding="space70">
              <Heading as={'h2'} variant={'heading40'}>
                CDP Traits
              </Heading>
              <TraitTags />
            </Card>

            <Card padding="space70">
              <Heading as="h4" variant="heading40">
                TIP: Solve for the customer
              </Heading>
              <Paragraph>
                Rather than looking for shortcuts or handing the case off to another rep, be invested in the situation
                as the customer. Look for long-term solutions that foster customer success, not quick fixes that will
                require more attention later.
              </Paragraph>
            </Card>
          </Stack>
        </Column>

        <Column span={4}>
          <Stack orientation={'vertical'} spacing="space50">
            <Card padding="space70">
              <Heading as={'h2'} variant={'heading40'}>
                CDP Engagement Metrics
              </Heading>
              <EngagementMetrics />
            </Card>

            <Card padding="space70">
              <Heading as={'h2'} variant={'heading40'}>
                Proactive Knowledge
              </Heading>
              <FauxSuggestions />
            </Card>
          </Stack>
        </Column>

        <Column span={4}>
          <Stack orientation={'vertical'} spacing="space50">
            <Card padding="space70">
              <Heading as={'h2'} variant={'heading40'}>
                CDP Event Timeline
              </Heading>
              <EventTimeline />
            </Card>
          </Stack>
        </Column>
      </Grid>
    </Box>
  );
};

export default SegmentView;
