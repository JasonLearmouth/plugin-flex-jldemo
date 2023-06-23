import React, { DragEvent, useState } from 'react'
import { withTaskContext, ITask, Actions } from '@twilio/flex-ui';
import { Box } from '@twilio-paste/core';

type Props = { children: React.ReactNode, task: ITask }

const Wrapper = (props: Props) => {
  const { children } = props;
  const conversationSid = props.task?.attributes.conversationSid ?? props.task?.attributes.channelSid;


  const [isTarget, setIsTarget] = useState(false);

  const handleDrop = async (e: DragEvent<HTMLElement>): Promise<void> => {
    e.preventDefault();
    setIsTarget(false);
    const cardDef = JSON.parse(e.dataTransfer.getData("adaptive-card"));
    const body = e.dataTransfer.getData("text");
    console.log('Got a drop:', body, cardDef);

    if (!conversationSid) return;
    await Actions.invokeAction('SendMessage', {
      body,
      conversationSid,
    });
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    console.log('No longer hovered:', e);
    setIsTarget(false);
  }

  function handleDragEnter(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    console.log('Item is now on top, not dropped yet:', e);
    setIsTarget(true);
  }

  return (
    <Box
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragExit={handleDragLeave}
      borderColor={"colorBorderSuccessWeak"}
      borderStyle={isTarget ? "solid" : "none"}
      borderWidth="borderWidth20"
      display="flex"
      position={"relative"}
      flexGrow={1}

    >
      <Box
        position={"absolute"}
        zIndex={"zIndex50"}
        opacity={"0.5"}
        display={isTarget ? "block" : "none"}
        width={"100%"}
        height={"100%"}
        backgroundColor={"colorBackgroundSuccess"}
        style={{ pointerEvents: "none" }}>
      </Box>

      <Box
        display="flex"
        position={"relative"}
        flexGrow={1}
        style={{ pointerEvents: isTarget ? "none" : "auto" }}>
        {children}
      </Box>

    </Box>
  )
}

export const TaskCanvasWrapper = withTaskContext(Wrapper);
