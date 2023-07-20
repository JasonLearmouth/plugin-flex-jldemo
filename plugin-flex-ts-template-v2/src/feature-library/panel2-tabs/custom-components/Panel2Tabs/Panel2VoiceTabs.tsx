import { Tabs, Tab, TabList, TabPanel, TabPanels } from '@twilio-paste/core';
import { useUID } from '@twilio-paste/core/dist/uid-library';
import Knowledge from '../Knowledge/Knowledge';
import SegmentView from '../Segment/SegmentView';

const Panel2VoiceTabs = () => {
  const selectedId = useUID();

  return (
    <Tabs selectedId={selectedId} baseId="panel2-fitted-tabs" variant="fitted">
      <TabList aria-label="Panel 2 tabs">
        <Tab id={selectedId}>Profile</Tab>
        <Tab>Knowledge</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SegmentView />
        </TabPanel>
        <TabPanel>
          <Knowledge />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Panel2VoiceTabs;
