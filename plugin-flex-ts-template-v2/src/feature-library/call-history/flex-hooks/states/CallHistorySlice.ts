import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CallDetails } from '../../types/CallDetails';
import { maxCalls } from '../../types/Constants';

export interface CallHistoryState {
  contactList: Array<CallDetails>;
}

const initialState = {
  contactList: [],
} as CallHistoryState;

const callHistorySlice = createSlice({
  name: 'callHistory',
  initialState,
  reducers: {
    addCallToHistory(state, action: PayloadAction<CallDetails>) {
      console.log('ADDING: ', action.payload);
      const newContactList = [action.payload]
        .concat(state.contactList)
        .slice(0, maxCalls);
      console.log('NEWLIST: ', newContactList);
      return {
        contactList: newContactList,
      };
    },
    setCallHistory(state, action: PayloadAction<Array<CallDetails>>) {
      console.log('setCallHistory', state, action);
      state.contactList = action.payload;
    },
    clearCallHistory(state, action: PayloadAction<CallHistoryState>) {
      return initialState;
    },
  },
});

export const { addCallToHistory, setCallHistory, clearCallHistory } =
  callHistorySlice.actions;
export const reducerHook = () => ({
  callHistory: callHistorySlice.reducer,
});
