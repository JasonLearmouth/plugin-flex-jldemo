import * as Flex from '@twilio/flex-ui';

import { FlexEvent } from '../../../../types/feature-loader';

export const eventName = FlexEvent.pluginsInitialized;
export const eventHook = function registerAction(flex: typeof Flex, _manager: Flex.Manager) {
  // When inside an iframe, ensure left panel is always shown
  if (window.top != window.self) {
    flex.AgentDesktopView.defaultProps.showPanel2 = false;
    flex.AgentDesktopView.defaultProps.splitterOptions = {
      initialFirstPanelSize: '375px',
      minimumFirstPanelSize: '375px',
      minimumSecondPanelSize: '0px',
    };
  } else {
    flex.AgentDesktopView.defaultProps.splitterOptions = {
      initialFirstPanelSize: '400px',
    };

    // Don't update Task Info Panel, just reset and exit
    return;
  }

  _manager.strings.TaskInfoPanelContent = `
    <h1>Customer Info</h1>
    <h2>Name</h2>
    <p>{{task.attributes.user.name}}</p>
    <h2>Title</h2>
    <p>{{task.attributes.user.title}}</p>
    <h2>Department</h2>
    <p>{{task.attributes.user.department}}</p>
    <h2>Phone</h2>
    <p>{{task.attributes.user.phone}}</p>
    <h2>Location</h2>
    <p>{{task.attributes.user.location}}</p>
    <h2>user_sys_id</h2>
    <p>{{task.attributes.user_sys_id}}</p>
    <hr />
    <h1>Task Info</h1>
    <h2>Ticket #</h2>
    <p>{{task.attributes.ticket_number}}</p>
    <h2>SID</h2>
    <p>{{task.sid}}</p>
    <h2>Channel</h2>
    <p>{{task.attributes.channelType}}</p>
    <h2>Priority</h2>
    <p>{{task.priority}}</p>
    <h2>Create Date</h2>
    <p>{{task.dateCreated}}</p>
    <hr />
    `;
};
