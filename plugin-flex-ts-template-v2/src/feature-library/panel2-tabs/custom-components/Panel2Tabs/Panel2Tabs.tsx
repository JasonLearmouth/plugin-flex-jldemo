import { Tabs, Tab, TabList, TabPanel, TabPanels } from '@twilio-paste/core';
import { useUID } from '@twilio-paste/core/dist/uid-library';
import CannedResponsesCRM from '../CannedResponses/CannedResponsesCRM';
import ConversationCardsCRM from '../AdaptiveCards/ConversationCardsCRM';
import Knowledge from '../Knowledge/Knowledge';
import SegmentView from '../Segment/SegmentView';
import ConversationSummaryCard from '../ConversationSummary/ConversationSummaryCard';

const Panel2Tabs = () => {
  const selectedId = useUID();

  return (
    <>
      <ConversationSummaryCard currentLanguage={'en'} />
      <Tabs selectedId={selectedId} baseId="panel2-fitted-tabs" variant="fitted">
        <TabList aria-label="Panel 2 tabs">
          <Tab id={selectedId}>Profile</Tab>
          <Tab>Cards</Tab>
          <Tab>Responses</Tab>
          <Tab>Knowledge</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SegmentView />
          </TabPanel>
          <TabPanel>
            <ConversationCardsCRM />
          </TabPanel>
          <TabPanel>
            <CannedResponsesCRM />
          </TabPanel>
          <TabPanel>
            <Knowledge />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Panel2Tabs;
