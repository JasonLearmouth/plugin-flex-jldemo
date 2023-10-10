import { getFeatureFlags } from '../../utils/configuration';
import ConversationCardsConfig from './types/ServiceConfiguration';

const { enabled = false } = (getFeatureFlags()?.features?.conversation_cards as ConversationCardsConfig) || {};

export const isFeatureEnabled = () => {
  return enabled;
};
