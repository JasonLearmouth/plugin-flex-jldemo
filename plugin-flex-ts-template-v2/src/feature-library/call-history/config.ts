import { getFeatureFlags } from '../../utils/configuration';
import CallHistoryConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.call_history as CallHistoryConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
