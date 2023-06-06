import { Manager } from '@twilio/flex-ui';
import {
  addCallToHistory,
  setCallHistory,
} from '../flex-hooks/states/CallHistorySlice';
import { Task } from 'types/task-router';
import { CallDetails } from '../types/CallDetails';
import { maxCalls } from '../types/Constants';

let manager = Manager.getInstance();

const RecentCallsKey = 'RECENT_CALLS';

class RecentCalls {
  getRecentCallsListFromLocalStorage(): Array<CallDetails> {
    const item = localStorage.getItem(RecentCallsKey);
    console.log('RecentCalls.getRecentCallsListFromLocalStorage', item);
    if (item) {
      return JSON.parse(item);
    } else {
      return [];
    }
  }

  initCallHistory = () => {
    const callHistory = this.getRecentCallsListFromLocalStorage();

    if (callHistory && callHistory.length > 0) {
      manager.store.dispatch(setCallHistory(callHistory));
    }
  };

  addCall = (task: Task) => {
    const channel = task.taskChannelUniqueName;
    const taskSid = task.sid;
    const queue = task.queueName;
    const dateCreated = task.dateCreated;
    const duration = task.age;
    //Enable caller name number lookup on phone number to populate name
    const { direction, from, outbound_to, call_sid, name } = task.attributes;

    let outcome = task.attributes?.conversations?.outcome || 'Completed';

    let call: CallDetails = {
      channel,
      name: name || 'Unknown',
      direction,
      number: direction == 'inbound' ? from : outbound_to,
      taskSid,
      call_sid,
      duration,
      queueName: queue,
      dateCreated: dateCreated.toISOString(),
      outcome,
    };

    // Save to localStorage
    const callsList = this.getRecentCallsListFromLocalStorage();
    const newCallsList = [call].concat(callsList).slice(0, maxCalls);
    localStorage.setItem(RecentCallsKey, JSON.stringify(newCallsList));

    // Update Redux
    manager.store.dispatch(addCallToHistory(call));
  };
}

const recentCalls = new RecentCalls();

export default recentCalls;
