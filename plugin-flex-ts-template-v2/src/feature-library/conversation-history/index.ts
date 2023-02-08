import { getFeatureFlags } from '../../utils/configuration';

const { enabled = false } = getFeatureFlags()?.features?.conversation_history || {};

export const isFeatureEnabled = () => {
  return enabled;
};
