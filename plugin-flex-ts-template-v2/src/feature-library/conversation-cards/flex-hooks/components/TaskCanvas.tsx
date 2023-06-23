import * as Flex from '@twilio/flex-ui';
import React from 'react';
import { TaskCanvasWrapper } from '../../custom-components/TaskCanvasWrapper';
import { FlexComponent } from '../../../../types/feature-loader';

// Panel.Styles.ts
import { styled } from "@twilio/flex-ui";

export const PanelStyles = styled('div')`
  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
`;

export const componentName = FlexComponent.TaskCanvas;
export const componentHook = function wrapTaskCanvasComponent(flex: typeof Flex, _manager: Flex.Manager) {

  flex.TaskCanvas.Content.addWrapper((OriginalComponent) => (originalProps) => {
    return (
      <TaskCanvasWrapper>
        <OriginalComponent  {...originalProps} />
      </TaskCanvasWrapper>
    );
  });
};
