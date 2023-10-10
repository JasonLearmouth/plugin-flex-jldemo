import { getFeatureFlags } from '../../utils/configuration';
import VirtualAgentNonVoiceConfig from './types/ServiceConfiguration';

const { enabled = false, backend_url } =
  (getFeatureFlags()?.features?.virtual_agent_non_voice as VirtualAgentNonVoiceConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};

export const getBackendUrl = () => {
  return backend_url;
};
