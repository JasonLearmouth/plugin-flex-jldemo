import * as Flex from '@twilio/flex-ui';
import React from 'react';
import { TaskCanvasWrapper } from '../../custom-components/TaskCanvasWrapper';
import { FlexComponent } from '../../../../types/feature-loader';

export const componentName = FlexComponent.TaskCanvas;
export const componentHook = function wrapTaskCanvasComponent(flex: typeof Flex, _manager: Flex.Manager) {
  flex.TaskCanvas.Content.addWrapper((OriginalComponent) => (originalProps) => {
    return (
      <TaskCanvasWrapper>
        <OriginalComponent {...originalProps} />
      </TaskCanvasWrapper>
    );
  });
};
