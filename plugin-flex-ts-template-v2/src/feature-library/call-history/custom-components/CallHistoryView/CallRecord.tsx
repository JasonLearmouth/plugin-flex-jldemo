
import { Icon } from '@twilio/flex-ui';

import { Button, Flex, Box, Tr, Td } from "@twilio-paste/core";

import { CallIncomingIcon } from "@twilio-paste/icons/esm/CallIncomingIcon";
import { CallOutgoingIcon } from "@twilio-paste/icons/esm/CallOutgoingIcon";
import { UserIcon } from "@twilio-paste/icons/esm/UserIcon";
import { CalendarIcon } from "@twilio-paste/icons/esm/CalendarIcon";
import { CallDetails } from '../../types/CallDetails';
import { DateTime, Duration } from 'luxon';

interface CallRecordProps {
  rc: CallDetails,
  redial: Function
}

const CallRecord = ({ rc, redial }: CallRecordProps) => {
  const buttonTitle = rc.direction == 'inbound'
    ? `Incoming from ${rc.name} (${rc.number})`
    : `Outgoing to ${rc.name} (${rc.number})`;

  const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const rawDuration = Duration.fromDurationLike({ seconds: rc.duration });
  const scaledDuration = rawDuration.rescale().toObject();

  const formatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  } as Intl.DateTimeFormatOptions;

  let localTime: DateTime;

  localTime = DateTime.fromISO(rc.dateCreated);

  return (
    <Tr
      key={rc.taskSid}
    >
      <Td >
        <>
          <Button variant='link' onClick={() => {
            redial(rc);
          }}>

            <Box display={'flex'}>
              <Box paddingRight={'space20'}>
                {rc.direction == 'inbound' && <CallIncomingIcon decorative={true} />}
                {rc.direction == 'outbound' && <CallOutgoingIcon decorative={true} />}
              </Box>
              {rc.number}
            </Box>
          </Button>

          {rc.number !== rc.name &&
            <Box display={'flex'} paddingTop={'space20'}>
              <Box paddingRight={'space20'}>
                <UserIcon decorative={true} />
              </Box>
              <>{rc.name}</>
            </Box>
          }
        </>
      </Td>
      <Td >
        <>
          <Box display={'flex'} paddingTop={'space20'}>
            <Box paddingRight={'space20'}>
              <CalendarIcon decorative={true} />
            </Box>
            <>{localTime.toLocaleString(DateTime.DATE_SHORT)}</>
          </Box>

          <Box display={'flex'} paddingTop={'space20'}>
            <Box paddingRight={'space20'}>
              <Icon icon="Clock" />
            </Box>
            <>{localTime.toLocaleString(DateTime.TIME_SIMPLE)}</>
          </Box>
        </>
      </Td>
      <Td>{scaledDuration.minutes ? `${scaledDuration.minutes}m` : ''}{scaledDuration.seconds}s</Td>
    </Tr>
  );
}

export default CallRecord;
