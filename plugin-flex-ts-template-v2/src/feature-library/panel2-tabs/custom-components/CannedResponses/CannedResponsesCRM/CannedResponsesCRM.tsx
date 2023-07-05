import React, { useState, useEffect } from 'react';
import { Box } from '@twilio-paste/core/box';
import { Text } from '@twilio-paste/text';
import { SkeletonLoader } from '@twilio-paste/core/skeleton-loader';
import { Column, Grid } from '@twilio-paste/core/grid';
import { Stack } from '@twilio-paste/stack';
import { Template, templates } from '@twilio/flex-ui';

import { CannedResponseCategories, ResponseCategory } from '../../../types/CannedResponses/CannedResponses';
import Category from './Category';
import CannedResponsesService from '../../../utils/CannedResponses/CannedResponsesService';
import { StringTemplates } from '../../../flex-hooks/strings';

const CannedResponsesCRM: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [responseCategories, setResponseCategories] = useState<undefined | CannedResponseCategories>(undefined);

  useEffect(() => {
    async function getResponses() {
      try {
        const responses = await CannedResponsesService.fetchCannedResponses();
        setResponseCategories(responses.data);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setError(true);
      }
    }

    getResponses();
  }, []);

  return (
    <Box as="div" padding="space50">
      {isLoading && <SkeletonLoader />}
      {Boolean(responseCategories) && !isLoading && (
        <>
          {responseCategories?.categories.map((category: ResponseCategory) => (
            <Grid gutter="space30" vertical key={category.section}>
              <Column>
                <Category {...category} />
              </Column>
            </Grid>
          ))}
        </>
      )}
      {error && (
        <Text as="p">
          <Template source={templates[StringTemplates.ErrorFetching]} />
        </Text>
      )}
    </Box>
  );
};

export default CannedResponsesCRM;
