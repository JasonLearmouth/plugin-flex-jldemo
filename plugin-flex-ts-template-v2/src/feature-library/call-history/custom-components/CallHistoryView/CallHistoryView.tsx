import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  Button,
  Flex,
  Box,
  Table,
  THead,
  TBody,
  Th,
  Tr,
  Text,
  Tooltip,
  Input,
} from '@twilio-paste/core';

import { InformationIcon } from "@twilio-paste/icons/esm/InformationIcon";
import { SearchIcon } from "@twilio-paste/icons/esm/SearchIcon";


import { Actions } from '@twilio/flex-ui';
import { useSelector } from 'react-redux';
import { AppState } from 'types/manager';
import { FlexAction } from '../../../../types/feature-loader';

import CallRecord from './CallRecord';
import { CallHistoryState } from '../../flex-hooks/states/CallHistorySlice';
import { CallDetails } from '../../types/CallDetails';
import recentCalls from '../../utils/RecentCalls';

const CallHistory = () => {
  const redial = async (contact: CallDetails) => {
    console.log('call-history redial', contact);
    if (contact.channel == 'voice') {
      //voice
      console.log('Starting Outbound Call to', contact.number);
      Actions.invokeAction(FlexAction.StartOutboundCall, {
        destination: contact.number,
        taskAttributes: {
          name: contact.name,
          outbound_to: contact.name
        }
      });
    }
  };

  const callHistoryState = useSelector((state: AppState) => {
    console.log('AppState:', state);
    return state.custom.callHistory as CallHistoryState;
  });

  const [filter, setFilter] = useState<string>('');

  const onFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredHistory = callHistoryState.contactList.filter(
    (value) => {
      return value.name?.toUpperCase().startsWith(filter.toUpperCase()) || value.number?.toUpperCase().startsWith(filter.toUpperCase())
    });

  // Load redux from local storage.
  useEffect(() => {
    recentCalls.initCallHistory();
  }, []);

  return (
    <Box width="100%" height="100%" overflowY="auto" >
      <Box width="100%">
        <Input type='search' placeholder='Enter name or number' onChange={onFilterChange} value={filter} insertBefore={<SearchIcon decorative></SearchIcon>}></Input>
      </Box>
      <Table striped>
        <THead>
          <Tr>
            <Th>
              <Box display="flex" alignItems="center">
                <Text as="span" marginRight="space10">Contact</Text>
                <Tooltip text="Click on phone number to redial" placement="bottom">
                  <Button variant="reset" size="reset">
                    <InformationIcon decorative={false} title="Open Tooltip" display="block" />
                  </Button>
                </Tooltip>
              </Box>
            </Th>
            <Th>
              Time
            </Th>
            <Th align="center">
              Duration
            </Th>
          </Tr>
        </THead>
        <TBody>
          {filteredHistory.map((rc: CallDetails) => (
            <CallRecord
              key={rc.taskSid}
              rc={rc}
              redial={redial}
            />
          ))}
        </TBody>
      </Table>
    </Box >
  );
};

export default CallHistory;
