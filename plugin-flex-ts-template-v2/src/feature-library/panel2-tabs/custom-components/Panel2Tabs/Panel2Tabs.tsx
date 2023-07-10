import { Tabs, Tab, TabList, TabPanel, TabPanels } from '@twilio-paste/core';
import { useUID } from '@twilio-paste/core/dist/uid-library';
import CannedResponsesCRM from '../CannedResponses/CannedResponsesCRM';
import ConversationCardsCRM from '../AdaptiveCards/ConversationCardsCRM';
import Knowledge from '../Knowledge/Knowledge';

const Panel2Tabs = () => {
  const selectedId = useUID();

  return (
    <Tabs selectedId={selectedId} baseId='panel2-fitted-tabs' variant='fitted'>
      <TabList aria-label='Panel 2 tabs'>
        <Tab id={selectedId}>Cards</Tab>
        <Tab>Responses</Tab>
        <Tab>Profile</Tab>
        <Tab>Knowledge</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ConversationCardsCRM />
        </TabPanel>
        <TabPanel>
          <CannedResponsesCRM />
        </TabPanel>
        <TabPanel>
          <></>
        </TabPanel>
        <TabPanel>
          <Knowledge />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default Panel2Tabs;