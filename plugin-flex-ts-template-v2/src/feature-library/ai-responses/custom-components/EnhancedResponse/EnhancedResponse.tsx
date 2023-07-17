import React, { ChangeEvent, useState } from 'react';
import * as Flex from '@twilio/flex-ui';
import { NewIcon } from '@twilio-paste/icons/esm/NewIcon';
import { withTaskContext, TaskContextProps } from '@twilio/flex-ui';

import { ResponseEnhancerWrapper } from './ResponseEnhancerWrapperStyles';
import AiResponsesService from '../../utils/AiResponsesService';
import { Button, Select, Option, Switch, Text, Flex as PasteFlex } from '@twilio-paste/core';
import { personas } from '../../types/Personas';
import SegmentService from '../../../../feature-library/panel2-tabs/utils/SegmentService/SegmentService';
import { KnownTraits } from '../../../../feature-library/panel2-tabs/flex-hooks/strings/segmentTraits';

interface OwnProps {
  // Props passed directly to the component
}

type Props = TaskContextProps & OwnProps;

const EnhancedResponse: React.FunctionComponent<Props> = ({ task }) => {
  const conversationSid = task?.attributes.conversationSid;

  const [isLoading, setIsLoading] = useState(false);
  const [persona, setAiPersona] = useState('corporate and concise');
  const [traitsOn, setTraitsOn] = React.useState(false);

  const currResponse = Flex.useFlexSelector((state) => state.flex.chat.conversationInput[conversationSid].inputText);

  const rephraseResponse = async () => {
    if (currResponse.trim().length == 0) {
      return;
    }

    try {
      setIsLoading(true);
      const userTraits = await SegmentService.getTraitsForUser(task?.attributes.email);
      let userContext: string = '';

      if (traitsOn) {
        KnownTraits.forEach((item) => {
          if (userTraits.hasOwnProperty(item.key)) {
            userContext += '\n - ' + item.label + ' is ' + (userTraits as any)[item.key] + ' ';
          }
        });

        if (userContext.length > 0) userContext.length + '\n';
      }

      const newResponse = await AiResponsesService.getEnhancedResponseWithPersonaAndUserContext(
        currResponse,
        persona,
        userContext,
      );

      setIsLoading(false);

      if (!newResponse) {
        return;
      }

      Flex.Actions.invokeAction('SetInputText', {
        body: newResponse,
        conversationSid: task?.attributes.conversationSid,
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handlePersonaChoice = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log('Handle persona selection', e);
    setAiPersona(e.target.value);
  };

  const makeSelectBetter = () => {
    return (
      <Select id="persona" value={persona} onChange={(choice) => handlePersonaChoice(choice)}>
        {personas.map((persona) => {
          return (
            <Option key={persona.name} value={persona.prompt}>
              {persona.name}
            </Option>
          );
        })}
      </Select>
    );
  };

  return (
    <ResponseEnhancerWrapper>
      <PasteFlex hAlignContent="center" vAlignContent="center" padding="space10">
        {makeSelectBetter()}
        <Switch name="useTraits" value="traits" checked={traitsOn} onChange={() => setTraitsOn(!traitsOn)}>
          <Text as={'p'} fontSize="fontSize20">
            Traits
          </Text>
        </Switch>
        <Button onClick={rephraseResponse} size="circle" variant="secondary_icon" loading={isLoading}>
          <NewIcon decorative={false} title="Rephrase" />
        </Button>
      </PasteFlex>
    </ResponseEnhancerWrapper>
  );
};

export default withTaskContext(EnhancedResponse);
