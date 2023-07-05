import { Tabs, Tab, TabList, TabPanel, Table } from '@twilio-paste/core';
import { useUID } from '@twilio-paste/core/dist/uid-library';

const Panel2Tabs = () => {
  const selectedId = useUID();

  return (
    <Tabs selectedId={selectedId} baseId='panel2-fitted-tabs' variant='fitted'>
      <TabList aria-label='Panel 2 tabs'>
        <Tab>Cards</Tab>
        <Tab>Responses</Tab>
        <Tab>Segment</Tab>
        <Tab>Knowledge</Tab>
      </TabList>
    </Tabs>
  )
}

export default Panel2Tabs;