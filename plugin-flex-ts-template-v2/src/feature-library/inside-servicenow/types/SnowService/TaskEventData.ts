export interface TaskEventData {
  worker: any;
  task: {
    sid: string;
    attributes: any;
  };
  eventType: string;
}
