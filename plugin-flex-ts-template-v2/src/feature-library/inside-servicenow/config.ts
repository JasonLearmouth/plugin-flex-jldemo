import { getFeatureFlags } from '../../utils/configuration';
import InsideServicenowConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.inside_servicenow as InsideServicenowConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
