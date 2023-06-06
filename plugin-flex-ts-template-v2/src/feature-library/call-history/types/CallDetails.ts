export interface CallDetails {
  channel: string;
  taskSid: string;
  direction: string | undefined;
  number: string | undefined;
  name: string | undefined;
  queueName: string;
  call_sid: string;
  duration: number;
  dateCreated: string;
  outcome: string | undefined;
}
