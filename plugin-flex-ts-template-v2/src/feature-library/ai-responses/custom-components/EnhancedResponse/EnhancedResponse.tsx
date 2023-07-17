import React, { ChangeEvent, useState } from 'react';
import * as Flex from '@twilio/flex-ui';
import { NewIcon } from '@twilio-paste/icons/esm/NewIcon';
import { withTaskContext, TaskContextProps } from '@twilio/flex-ui';

import { ResponseEnhancerWrapper } from './ResponseEnhancerWrapperStyles';
import AiResponsesService from '../../utils/AiResponsesService';
import { Button, Select, Option } from '@twilio-paste/core';
import { personas } from '../../types/Personas';

interface OwnProps {
  // Props passed directly to the component
}

type Props = TaskContextProps & OwnProps;

const EnhancedResponse: React.FunctionComponent<Props> = ({ task }) => {
  const conversationSid = task?.attributes.conversationSid;

  const [isLoading, setIsLoading] = useState(false);
  const [persona, setAiPersona] = useState('corporate');
  const currResponse = Flex.useFlexSelector((state) => state.flex.chat.conversationInput[conversationSid].inputText);

  const rephraseResponse = async () => {
    if (currResponse.trim().length == 0) {
      return;
    }

    try {
      setIsLoading(true);
      const newResponse = await AiResponsesService.getEnhancedResponseWithPersona(currResponse, persona);
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
    setAiPersona(e.target.value);
  };

  const makeSelectBetter = () => {
    return (
      <Select id="persona" onChange={(choice) => handlePersonaChoice(choice)}>
        {personas.map((persona) => {
          return <Option value={persona.prompt}>{persona.name}</Option>;
        })}
      </Select>
    );
  };

  return (
    <ResponseEnhancerWrapper>
      {makeSelectBetter()}
      <Button onClick={rephraseResponse} size="circle" variant="secondary_icon" loading={isLoading}>
        <NewIcon decorative={false} title="Rephrase" />
      </Button>
    </ResponseEnhancerWrapper>
  );
};

export default withTaskContext(EnhancedResponse);
