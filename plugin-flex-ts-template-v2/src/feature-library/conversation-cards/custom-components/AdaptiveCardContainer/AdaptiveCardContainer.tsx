import React, { useEffect, useRef } from 'react';
import { ITask, withTaskContext } from '@twilio/flex-ui';
import { Alert, Box, Card } from '@twilio-paste/core';
import * as AdaptiveCards from 'adaptivecards';

interface AdaptiveCardContainerProps {
  message?: any;
  task?: ITask;
}

const ConversationCard: React.FunctionComponent<AdaptiveCardContainerProps> = ({ message, task }) => {
  let hostConfig: Partial<AdaptiveCards.HostConfig> = {
    supportsInteractivity: true,
    fontFamily:
      '"Inter var experimental", "Inter var", -apple-system, "system-ui", "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  };

  if (!message.source.attributes?.['adaptive-card']) {
    console.log('No adaptive card found in the message', message.source.attributes);
    return (
      <Alert variant="warning">
        <strong>Message error</strong> Adaptive card is missing in the message.
      </Alert>
    );
  }

  const mountRef = useRef<any>();

  // Create the reference to the adaptive card once and maintain a reference to it
  useEffect(() => {
    const adaptiveCard = new AdaptiveCards.AdaptiveCard();
    adaptiveCard.hostConfig = new AdaptiveCards.HostConfig(hostConfig);
    adaptiveCard.parse(JSON.parse(message.source.attributes['adaptive-card']));

    // Provide an onExecuteAction handler to handle the Action.Submit
    adaptiveCard.onExecuteAction = (action: AdaptiveCards.Action) => {
      if (action instanceof AdaptiveCards.SubmitAction) {
        // If you copy this code sample, remove the alert statement
        // and provide your own custom handling code
        alert('You clicked ' + action.title);
      }
    };

    let renderedCard = adaptiveCard.render();
    mountRef.current.appendChild(renderedCard);
  }, []);

  return (
    <Box marginTop={'space20'} marginBottom={'space50'}>
      <Card padding={'space20'}>
        <div ref={mountRef} />
      </Card>
    </Box>
  );
};

export default withTaskContext(ConversationCard);
