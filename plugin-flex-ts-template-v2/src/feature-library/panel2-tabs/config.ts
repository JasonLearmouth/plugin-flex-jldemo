import { getFeatureFlags } from '../../utils/configuration';
import Panel2TabsConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.panel2_tabs as Panel2TabsConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
