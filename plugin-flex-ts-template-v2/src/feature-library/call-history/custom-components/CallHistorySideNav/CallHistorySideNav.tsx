import React from 'react';
import { SideLink, Actions } from '@twilio/flex-ui';
import { HistoryIcon } from '@twilio-paste/icons/esm/HistoryIcon'

interface OwnProps {
  activeView?: string;
  viewName: string;
}

const CallHistoryLink = (props: OwnProps) => {
  function navigate() {
    Actions.invokeAction('NavigateToView', { viewName: props.viewName });
  }

  return (
    <SideLink
      showLabel={true}
      icon={<HistoryIcon decorative={false} title='Call History' />}
      iconActive={<HistoryIcon decorative={false} title='Call History' />}
      isActive={props.activeView === props.viewName}
      onClick={navigate}
      key="call-history-side-link"
    >
      Call History
    </SideLink>
  );
};

export default CallHistoryLink;
